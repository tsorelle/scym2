<?php
/**
 * Created by PhpStorm.
 * User: Terry
 * Date: 10/27/2015
 * Time: 8:35 AM
 */

namespace App\db;

use App\db\api\CreditTypeDto;
use App\db\api\HousingTypeDto;
use App\db\scym\ScymAgeGroup;
use App\db\scym\ScymAnnualSession;
use App\db\scym\ScymAttender;
use App\db\scym\ScymCreditType;
use App\db\scym\ScymDonationType;
use App\db\scym\ScymFee;
use App\db\scym\ScymHousingAssignment;
use App\db\scym\ScymHousingType;
use App\db\scym\ScymHousingUnit;
use App\db\scym\ScymMeeting;
use App\db\scym\ScymRegistration;
use App\db\scym\ScymYouth;
use Doctrine\ORM\EntityRepository;
use PDO;
use Symfony\Component\Config\Definition\Exception\Exception;
use Symfony\Component\Validator\Constraints\DateTime;
use Tops\db\TDbServiceManager;
use Tops\db\TQueryManager;
use Tops\sys\TListItem;
use Tops\sys\TLookupItem;
use Tops\sys\TNameValuePair;

class ScymRegistrationsManager extends TDbServiceManager
{

    private static $currentAnnualSession = null;

    /**
     * @param null $year
     * @return null|ScymAnnualSession
     */
    public function getSession($year = null) {
        $repository =  $this->getRepository('App\db\scym\ScymAnnualSession');
        /**
         * @var $result ScymAnnualSession
         */
        $result=null;
        $currentYear = date("Y"); // current year
        if ($year == null) {
            $year = $currentYear;
        }
        $isCurrent = ($year == $currentYear);
        if ($isCurrent) {
            if (self::$currentAnnualSession != null) {
                return self::$currentAnnualSession;
            }
            $year = date("Y"); // current year
            $result = $repository->find($year);
            if (empty($result)) {
                throw new Exception("Yearly meeting year $year is not in the annualsessions table.");
            }
            // if we are 60 days past the yearly meeting end date for the curren year, go to next year.
            $endDate = clone $result->getEnd(); // must clone because $endDate->add would change $result->end
            $today = new \DateTime();
            if ($today > $endDate->add(new \DateInterval('P120D'))) {
                $year++;
                $result = null; // try again
            }
        }
        if ($result == null) {
            $result = $repository->find($year);
            if (empty($result)) {
                throw new Exception("Yearly meeting year $year is not in the annualsessions table.");
            }
        }
        if ($isCurrent) {
            self::$currentAnnualSession = $result;
        }
        return $result;
    }

    public function getUserRegistrationId($username, $year) {
        $repository =  $this->getRepository('App\db\scym\ScymRegistration');
        $result = $repository->findOneBy(array('username' => $username, 'year' => $year));
        if ($result) {
            return $result->getRegistrationId();
        }
        return 0;
    }

    public function getFeeTables() {
        $repository =  $this->getRepository('App\db\scym\ScymFee');
        $fees = $repository->findAll();
        $result = array();
        foreach ($fees as $fee) {
            /**
             * @var $fee ScymFee
             */
            $item = $fee->getDataTransferObject();
            $result[$item->feeCode] = $item;
        }
        return $result;
    }

    public function getNonWaivableFees() {
        $em = $this->getEntityManager();
        $q = $em->createQuery("select f from App\db\scym\ScymFee f where f.canwaive = 0");
        $fees = $q->getResult();
        $result = array();
        foreach ($fees as $fee) {
            /**
             * @var $fee ScymFee
             */
            array_push($result,$fee->getFeeTypeId());
        }
        return $result;
    }

    public function getFeeDescriptions() {
        $repository =  $this->getRepository('App\db\scym\ScymFee');
        $fees = $repository->findAll();
        $result = array();
        foreach ($fees as $fee) {
            /**
             * @var $fee ScymFee
             */
            $result[$fee->getFeeTypeId()] = $fee->getDescription();
        }
        return $result;
    }

    /**
     * @return CreditTypeDto[]
     */
    public function getCreditTypes() {
        $repository =  $this->getRepository('App\db\scym\ScymCreditType');
        $types = $repository->findBy(array('active' => 1));
        $result = array();
        foreach ($types as $type) {
            /**
             * @var $type ScymCreditType
             */
            $item = $type->getDataTransferObject();
            $id = $type->getCreditTypeid();
            $result[$id] = $item;
        }
        return $result;

    }

    public function getCreditTypesLookupList() {
        $qm = TQueryManager::getInstance();
        $sql = "SELECT c.creditTypeName AS 'Name',c.creditTypeId AS 'Value' FROM credittypes c WHERE active = 1";
        $statement = $qm->executeStatement($sql);
        $result = $statement->fetchAll(PDO::FETCH_OBJ);

        return $result;

    }

    public function  getHousingTypesEditList() {
        $qm = TQueryManager::getInstance();
        $sql = 'SELECT * FROM housingTypesView ORDER BY housingTypeDescription';
        $statement = $qm->executeStatement($sql);
        $result = $statement->fetchAll(PDO::FETCH_OBJ);

        return $result;
    }


    /**
     * @return HousingTypeDto[]
     */
    public function getHousingTypes() {
        $repository =  $this->getRepository('App\db\scym\ScymHousingType');
        $types = $repository->findBy(array('active' => 1));
        $result = array();
        foreach ($types as $type) {
            /**
             * @var $type ScymHousingType
             */
            $item = $type->getDataTransferObject();
            $result[$item->housingTypeId] = $item;
        }
        return $result;
    }

    /* service contract
     *  export interface IHousingTypeListItem extends IListItem {
     *      category: any;
     *  }
     *
     *  export interface IListItem {
     *      Text: string;
     *      Value: any;
     *      Description: string;
     *  }
     */


    public function getHousingTypesLookup($activeOnly = true) {
        $qm = TQueryManager::getInstance();
        $sql =
            "SELECT housingTypeID AS 'Key', ".
            ($activeOnly ? 'housingTypeDescription ' : "CONCAT(housingTypeDescription, IF(active=1,'',' [inactive]')) ")." AS 'Text', ".
            'housingTypeDescription AS Description, category '.
            'FROM housingtypes  '.
            ($activeOnly ? ' WHERE active=1 ': ' ').
            'ORDER BY housingTypeDescription';

        $statement = $qm->executeStatement($sql);
        $result = $statement->fetchAll(PDO::FETCH_OBJ);

        return $result;
    }




    function getHousingAssignmentsText($registrationId) {

        $qm = TQueryManager::getInstance();
        $sql = 'SELECT * FROM housingAssignmentsTextView WHERE registrationId = ? ORDER BY firstName, day';
        $statement = $qm->executeStatement($sql,$registrationId);
        $result = $statement->fetchAll(PDO::FETCH_OBJ);

        return $result;


    }

    public function getHousingUnitsList() {
        return $this->getHousingUnits(true);
    }

    public function getHousingUnits($activeOnly = false) {
        $qm = TQueryManager::getInstance();
        $sql = 'SELECT * FROM housingUnitsView '.
            ($activeOnly ? 'WHERE active = 1 ' : '').
                'ORDER BY unitname';
        $statement = $qm->executeStatement($sql);
        $result = $statement->fetchAll(PDO::FETCH_OBJ);
        if ($result != null) {
            foreach($result as $unit) {
                $unit->active = ($unit->active != 0);
            }
        }
        return $result;
    }

    /**
     * @param ScymRegistration $registration
     * @return array
     *
     *  Array elements match IAttenderHousingAssignment in assets/js/App/Tops.app/registration.d.ts
     */
    public function getRegistrationHousingAssignments(ScymRegistration $registration) {
        $result = array();
        $attenders = $registration->getAttenders()->toArray();
        foreach($attenders as $attender) {
            /**
             * @var $attender ScymAttender
             */
            $assignment = new \stdClass(); // IAttenderHousingAssignment
            $assignment->attender = new \stdClass(); // IHousingPreference

            $assignment->attender->attenderId = $attender->getAttenderId();
            $assignment->attender->attenderName = $attender->getFullName();
            $assignment->attender->housingPreference = $attender->getHousingTypeId();
            $assignment->attender->occupancy = $attender->getSingleOccupant() ? 'single' : '';

            $assignment->assignments = array(); // IHousingAssignment[];
            $attenderHousingAssignments = $attender->getHousingAssignments()->toArray();
            $housingAssignments = array();
            foreach($attenderHousingAssignments as $attenderHousingAssignment) {
                /**
                 * @var ScymHousingAssignment $attenderHousingAssignment
                 */
                $housingAssignments['day '.$attenderHousingAssignment->getDay()] =
                    $attenderHousingAssignment;
            }

            $first = (int)($attender->getArrivalTime() / 10);
            $last = (int)($attender->getDeparturetime() / 10);

            for($day = $first; $day < $last; $day++) {

                /**
                 * @var $housingAssignment ScymHousingAssignment
                 */
                $housingAssignmentDto = new \stdClass(); // IHousingAssignment
                $housingAssignmentDto->day = $day;

                if (array_key_exists("day $day",$housingAssignments)) {
                    $housingAssignment = $housingAssignments["day $day"];
                    $housingAssignmentDto->housingUnitId = $housingAssignment->getHousingUnitId();
                    $housingAssignmentDto->note = $housingAssignment->getNote();
                }
                else {
                    $housingAssignmentDto->housingUnitId = 0;
                    $housingAssignmentDto->note = '';
                }

                array_push($assignment->assignments,$housingAssignmentDto);
            }
            array_push($result,$assignment);
        }
        return $result;
    }

    /**
     * @return array
     */
    public function getHousingTypeList() {
        $repository =  $this->getRepository('App\db\scym\ScymHousingType');
        $types = $repository->findBy(array('active' => 1));
        $result = array();
        $categories = array(
          0 => 'Charged for meals.',
            1 => 'Dorm rate.',
            2 => 'Cabin rate',
            3 => 'Motel rate'
        );
        foreach ($types as $type) {
            /**
             * @var $type ScymHousingType
             */
            $item = new \stdClass();
            $item->Text = $type->getHousingTypeDescription();
            $item->Value = $type->getHousingTypeId();
            $item->category = $type->getCategory();
            $item->Description = $categories[$item->category];
            array_push($result,$item);
        }
        return $result;
    }

    /**
     * @param $id
     * @return ScymRegistration
     * @throws \Exception
     */
    public function getRegistration($id) {
        $repository =  $this->getRepository('App\db\scym\ScymRegistration');
        $result = $repository->find($id);
        if ($result == null) {
            throw new \Exception("Cannot find registration #$id");
        }
        return $result;
    }

    /**
     * @param $registrationCode
     * @return ScymRegistration
     */
    public function getRegistrationByCode($registrationCode,$year=null) {
        $repository =  $this->getRepository('App\db\scym\ScymRegistration');
        if ($year) {
            $result = $repository->findOneBy(array('registrationCode' => $registrationCode, 'year' => $year));
        }
        else {
            $result = $repository->findOneBy(array('registrationCode' => $registrationCode));
        }
        return $result;
    }

    public function checkRegistationCodeExists($registrationCode) {
        $session = $this->getSession();
        $em = $this->getEntityManager();
        $q = $em->createQuery('select r.registrationCode from App\db\scym\ScymRegistration r where r.registrationCode = ?1 and r.year = ?2');
        $q->setParameter(1,$registrationCode);
        $q->setParameter(2,$session->getYear());
        $result = $q->getResult();
        return (!empty($result));
    }

    public function getFundList() {
        $repository =  $this->getRepository('App\db\scym\ScymDonationType');
        $types = $repository->findBy(array('registrationform' => 1));
        $result = array();
        foreach ($types as $type) {
            /**
             * @var $type ScymDonationType
             */
            $item = $type->toLookupItem();
            array_push($result, $item);
        }
        return $result;
    }

    public function getFundNames() {
        $repository =  $this->getRepository('App\db\scym\ScymDonationType');
        $types = $repository->findBy(array('registrationform' => 1));
        $result = array();
        foreach ($types as $type) {
            /**
             * @var $type ScymDonationType
             */
            $result[$type->getDonationtypeid()] = $type->getFundname();
        }
        return $result;
    }

    public function deleteAccountItems(ScymRegistration $registration) {
        $em = $this->getEntityManager();
        $items = $registration->removeAccountItems();
        foreach ($items as $item) {
            $em->remove($item);
        }
    }

    public function deleteAttender(ScymRegistration $registration, $attenderId) {
        $em = $this->getEntityManager();
        $attender = $registration->removeAttenderById($attenderId);
        $em->remove($attender);
    }

    public function deleteRegistration(ScymRegistration $registration) {
        $em = $this->getEntityManager();
        $em->remove($registration);
        $em->flush();
    }

    public function deleteAttenders(ScymRegistration $registration, array $attenderIds) {
        if (!empty($attenderIds)) {
            $em = $this->getEntityManager();
            foreach ($attenderIds as $attenderId) {
                $attender = $registration->removeAttenderById($attenderId);
                if ($attender) {
                    $em->remove($attender);
                }
            }
        }
    }

    public function clearAccountItems(ScymRegistration $registration) {
        $em = $this->getEntityManager();
        $items = $registration->removeAccountItems();
        foreach ($items as $item) {
            $em->remove($item);
        }
    }

    public function updateDonations(array $donationItems, ScymRegistration $registration) {
        if ($donationItems != null) {
            $removed = $registration->updateDonations($donationItems);
            if (!empty($removed)) {
                foreach ($removed as $item) {
                    $em = $this->getEntityManager();
                    $em->remove($item);
                }
            }
        }
    }

    public function updateMeals(ScymAttender $attender, array $mealtimes)
    {
        $em = $this->getEntityManager();
        $removed = $attender->updateMeals($mealtimes);
        foreach ($removed as $meal) {
            $em->remove($meal);
        }
    }

    /**
     * @param $id
     * @return ScymAttender
     * @throws \Exception
     */
    public function getAttender($id) {
        $repository =  $this->getRepository('App\db\scym\ScymAttender');
        $result = $repository->find($id);
        if ($result == null) {
            throw new \Exception("Cannot find attender #$id");
        }
        return $result;
    }



    /**
     * @return TLookupItem[]
     *
     * Used on attender form
     */
    public function getAffiliationCodeLookup()
    {
        $result = array();
        $repository = $this->getRepository('App\db\scym\ScymMeeting');
        $meetings = $repository->findBy(
            array('active'=> '1'),
            array('meetingname' => 'ASC')
        );

        foreach ($meetings as $meeting) {
            /**
             * @var $meeting ScymMeeting
             */
            TListItem::AddToArray($result,$meeting->getMeetingname(),$meeting->getAffiliationcode());
        }
        return $result;
    }


    /**
     * @return array
     *  Service contract:
     *  export interface IListItem {
     *      Text: string;
     *      Value: any;
     *      Description: string;
     *  }
     *
     *  export interface IAgeGroup extends IListItem {
     *      cutoffAge : any;
     *  }
     *
     */
    public function getAgeGroupList($includeInactive = false) {
        $repository =  $this->getRepository('App\db\scym\ScymAgeGroup');
        // $ageGroups = $repository->findAll();

        $ageGroups = $repository->findBy(array(), array('cutoffage' => 'ASC'));

        $result = array();
        $priorAge = 0;
        foreach ($ageGroups as $ageGroup) {
            /**
             * @var $ageGroup ScymAgeGroup
             */
            $active = $ageGroup->getActive();
            if ($includeInactive || $active) {
                $item = new \stdClass();
                $item->Text = $ageGroup->getGroupName();
                $item->Value = $ageGroup->getAgeGroupId();
                $item->cutoffAge = $ageGroup->getCutoffAge();
                if ($active) {
                    $startAge = $priorAge == 0 ? 'Infant ' : "Age " . ($priorAge + 1);
                    $item->Description = "$startAge to $item->cutoffAge";
                    $priorAge = $item->cutoffAge;
                }
                else {
                    $item->Description = '(not used)';
                }
                if ($includeInactive) {
                    $item->active = $active;
                }
                array_push($result,$item);
            }
        }

        return $result;
    }

    /**
     * @return TQueryManager
     */
    private static function getQueryMananger() {
        return TQueryManager::getInstance();
    }


    public function getRegistrationIdentity($registrationId) {
        $qm = TQueryManager::getInstance();
        $sql =
            "SELECT registrationId, registrationCode, name AS registrationName, statusId ".
            "FROM registrations r WHERE registrationId = ?";
        $statement = $qm->executeStatement($sql,$registrationId);
        $result = $statement->fetch(PDO::FETCH_OBJ);
        return $result;
    }

    public function getRegistrationCount() {
        $qm = TQueryManager::getInstance();
        $sql = 'SELECT COUNT(DISTINCT registrationId) AS registrations, COUNT(*) AS attenders FROM currentAttenders';

        $counts = $qm->executeStatement($sql);
        $result = $counts->fetch(PDO::FETCH_OBJ);
        return $result;

    }

    public function getAttendersViewForRegistration($registrationId) {
        $qm = TQueryManager::getInstance();
        $sql = "SELECT * FROM attendersView WHERE registrationId = ?";
        $statement = $qm->executeStatement($sql,$registrationId);
        $result = $statement->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    public function getHousingAssignmentView($registrationId) {
        $sql =
            "SELECT a.attenderID AS attenderId, ha.housingUnitId,ha.day AS dayNumber, ".
            "ScymNumberToWeekday(ha.day) AS day,IFNULL(hu.unitname,'Not assigned') AS  unit ".
            "FROM housingassignments ha JOIN attenders a ON ha.attenderID = a.attenderID ".
            "JOIN registrations r ON r.registrationId = a.registrationId ".
            "RIGHT OUTER JOIN housingunits hu ON ha.housingUnitId = hu.housingUnitId ".
            "WHERE r.registrationId = ?";

        $qm = TQueryManager::getInstance();
        $statement = $qm->executeStatement($sql,$registrationId);
        $result = $statement->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    /**
     * @return mixed
     */
    public function getRegistrationList($searchtype='allregistrations',$searchValue=null) {
        // for testing, clear cache
//        $em = $this->getEntityManager();
//        $cacheDriver = $em->getConfiguration()->getResultCacheImpl();
//        $cacheDriver->deleteAll();
        // -------------

        $queryBuilder = TQueryManager::GetQueryBuilder();
        $session = $this->getSession();
        $year = $session->getYear();
        $q = $queryBuilder
            ->select('DISTINCT CONCAT(r.name," (",r.registrationCode,")") as Name' ,'r.registrationId as Value')
            ->where('year = :year')
            ->setParameter('year',$year)
            ->orderBy('r.name');

        switch($searchtype) {
            case 'incomplete' :
                $q->from('HousingAssignmentCounts','r');
                $q->andWhere('r.assignments < r.nights');
                break;
            case 'unconfirmed';
                $q->from('HousingAssignmentCounts','r');
                $q->andWhere('r.assignments >= r.nights AND r.confirmed = 0');
                break;
            case 'allregistrations' :
                $q->from('registrations','r');
                break;
            case 'name' :
                if ($searchValue == null) {
                    throw new \Exception("No search value");
                }
                $searchValue = str_replace('%20%',' ',$searchValue);
                $q->from('registrations','r');
                $q->innerJoin('r','attenders','a','a.registrationId = r.registrationId');
                $q->andWhere("r.name LIKE :searchval OR r.registrationCode LIKE :searchval OR FormatName(a.firstName ,a.middleName,a.lastName) LIKE :searchval OR FormatName(a.firstName ,null,a.lastName) LIKE :searchval");
                $q->setParameter('searchval',"%$searchValue%");
                break;

            default :
                throw new \Exception("Invalid searchtype '$searchtype'");
        }
        $statement = $q->execute();
        return $statement->fetchAll();
    }

    public function deleteYouth(ScymAttender $attender) {
        if ($attender != null) {
            $youth = $attender->removeYouth();
            if ($youth != null) {
                $em = $this->getEntityManager();
                $em->remove($youth);
            }
        }
    }

    public function removeEntity($entity) {
        $em = $this->getEntityManager();
        $em->remove($entity);
    }

    public function checkYouthRecord(ScymAttender $attender)
    {
        $generationId = $attender == null ? 0 : $attender->getGenerationId();
        if ($generationId == 1) {
            $this->deleteYouth($attender);
        }
    }



    /**
     * @param $id
     * @return ScymYouth
     * @throws \Exception
     */
    public function getYouth($youthId) {
        $repository =  $this->getRepository('App\db\scym\ScymYouth');
        $result = $repository->find($youthId);
        return $result;
    }

    public function reassignYouthAgeGroups($cutoffMonth = 9,$test=false) {
        $session = $this->getSession();
        $year = $session->getYear();
        $startMonth = $session->getStart()->format('m');;
        if ($cutoffMonth >= $startMonth) {
            $year--;
        }


       $baseDate = new \DateTime("$year-$cutoffMonth-1");
       $cutDate = new \DateTime();

        $ageGroupsRepository =  $this->getRepository('App\db\scym\ScymAgeGroup');
        // $youthRepository = $this->getRepository('App\db\scym\ScymYouth');
        $em = $this->getEntityManager();
        $ageGroups = $ageGroupsRepository->findBy(array(), array('cutoffage' => 'ASC'));
        $updateCount = 0;
        foreach ($ageGroups as $ageGroup) {
            /**
             * @var $ageGroup ScymAgeGroup
             */
            if ($ageGroup->getActive()) {
                $age = $ageGroup->getCutoffAge();
                $endDate = clone($cutDate);
                $cutDate = clone($baseDate);
                $cutDate->modify("-$age year");

                $testCut = $cutDate->format('Y-m-d');
                $testEnd = $endDate->format('Y-m-d');
                $testSql = "yo.dateOfBirth > '$testEnd' and yo.dateOfBirth <= '$testCut' ";
                $dql =
                    'SELECT y FROM App\db\scym\ScymYouth y '.
                    'JOIN y.attender a '.
                    'JOIN a.registration r '.
                    'WHERE y.dateofbirth > ?1 and y.dateofbirth <= ?2 and r.year > ?3';


                $testSql = "yo.dateOfBirth > '$testCut' and yo.dateOfBirth <= '$testEnd' ";

                $query = $em->createQuery($dql);

                $query->setParameter(1, $cutDate);
                $query->setParameter(2, $endDate);
                $query->setParameter(3, $year);
/*

                $query->setParameter(1, $cutDate);
                $query->setParameter(2, $endDate);
                $query->setParameter(3, 1);
                    // $year);
*/
                $youths = $query->getResult();
                foreach ($youths as $youth) {
                    /**
                     * @var $youth ScymYouth
                     */
                    $youth->setAgeGroupId($ageGroup->getAgeGroupId());
                    if (!$test) {
                        $this->persistEntity($youth);
                    }
                    $updateCount++;
                }
            }
            if (!$test) {
                $this->saveChanges();
            }
        }

        return $updateCount;
    }

    public function updateAgeGroups(array $updates) {
        $repository =  $this->getRepository('App\db\scym\ScymAgeGroup');
        foreach($updates as $update) {
            if (isset($update->id) && isset($update->cutoff) && isset($update->active)) {
                if ($update->id) {
                    $group = $repository->find($update->id);
                }
                else {
                    if (!isset($update->name)) {
                        return false;
                    }
                    $group = new ScymAgeGroup();
                    $group->setGroupName($update->name);
                }
                $group->setActive($update->active);
                $group->setCutoffAge($update->cutoff );
                $this->persistEntity($group);
            }
            else {
                return false;
            }
        }
        $this->saveChanges();
        return true;
    }



    public function updateHousingTypes(array $updateValues, $newTypes) {
        $repository =  $this->getRepository('App\db\scym\ScymHousingType');
        $updateCount = 0;
        foreach($updateValues as $updateValue) {
            $id = isset($updateValue->id) ? $updateValue->id : null;
            $active = isset($updateValue->active) ? $updateValue->active : null;
            if ($id !== null && $active !== null) {
                $housingType = $repository->find($id);
                if ($housingType != null) {
                    /**
                     * @var ScymHousingType $housingType
                     */
                    $housingType->setActive($active);
                    $this->persistEntity($housingType);
                    $updateCount++;
                }
            }
        }

        foreach($newTypes as $newType) {
            $housingTypeCode = isset($newType->housingTypeCode)  ? $newType->housingTypeCode : null;
            $housingTypeDescription = isset($newType->housingTypeDescription)  ? $newType->housingTypeDescription : null;
            $category = isset($newType->category)  ?  $newType->category : 0;
            if (!(empty($housingTypeDescription) || empty($housingTypeCode))) {
                $housingType = new ScymHousingType();
                $housingType->setActive(true);
                $housingType->setCategory($category);
                $housingType->setHousingTypeCode($housingTypeCode);
                $housingType->setHousingTypeDescription($housingTypeDescription);
                $this->persistEntity($housingType);
                $updateCount++;
            }
        }

        if ($updateCount > 0) {
            $this->saveChanges();
        }

        return $updateCount;
    }

    public function updateHousingUnits(array $updated, array $active) {
        $repository =  $this->getRepository('App\db\scym\ScymHousingUnit');
        $updateCount = 0;
        /**
         * @var ScymHousingUnit $unit
         */
        foreach($updated as $update) {
            $unitId        = isset($update->unitId       	) ? $update->unitId        : null;
            $unitname      = isset($update->unitname		) ? $update->unitname		: null;
            $capacity      = isset($update->capacity		) ? $update->capacity		: null;
            $housingTypeId = isset($update->housingTypeId	) ? $update->housingTypeId: null;
            if ($capacity === null || $housingTypeId === null || $unitId === null) {
                continue;
            }
            if($unitId == 0) {
                if ($unitname === null) {
                    continue;
                }
                $unit = new ScymHousingUnit();
                $unit->setUnitName($unitname);
                $unit->setActive(true);
            }
            else {
                $unit = $repository->find($unitId);
                if ($unit == null) {
                    continue;
                }
            }
            $unit->setCapacity($capacity);
            $unit->setHousingTypeId($housingTypeId);

            $this->persistEntity($unit);
            $updateCount ++;
        }
        $this->saveChanges();

        foreach($active as $item) {
            $active = isset($item->active) ? $item->active : null;
            $id = isset($item->id) ? $item->id : null;
            if($active === null || $id === null) {
                continue;
            }
            $unit = $repository->find($id);
            if ($unit === null) {
                continue;
            }
            $unit->setActive($active);
            $this->persistEntity($unit);
            $updateCount++;
        }

        $this->saveChanges();
        return $updateCount;
    }

    public function getReportView($viewName, $currentYear = true) {
        $qm = TQueryManager::getInstance();
        $sql = "SELECT * FROM $viewName";
        if ($currentYear) {
            $sql .= " WHERE year = ?";
            $session = $this->getSession();
            $statement = $qm->executeStatement($sql,$session->getYear());
        }
        else {
            $statement = $qm->executeStatement($sql);
        }
        $result = $statement->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    public function getDownloadView($viewName, $attendedOnly = false, $currentYear = true) {
        $qm = TQueryManager::getInstance();
        $sql = "SELECT * FROM $viewName";
        if ($attendedOnly) {
            $sql .= " WHERE attended = 'Yes'";
        }
        if ($currentYear) {
            $sql .= $attendedOnly ? ' AND ' : ' WHERE ';
            $sql .= " year = ?";
            $session = $this->getSession();
            $statement = $qm->executeStatement($sql,$session->getYear());
        }
        else {
            $statement = $qm->executeStatement($sql);
        }
        $result = $statement->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }



    public function getRegistrationItems($registrationId,$viewName) {
        $qm = TQueryManager::getInstance();
        $sql = "SELECT * FROM $viewName WHERE registrationId = ?";
        $statement = $qm->executeStatement($sql,$registrationId);
        $result = $statement->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    public function getView($viewName) {
        $qm = TQueryManager::getInstance();
        $sql = "SELECT * FROM $viewName";
        $statement = $qm->executeStatement($sql);
        $result = $statement->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

    public function getAccountDetails($registrationId, $includeLookups = true) {
        $result = new \stdClass();
        $result->registrationId = $registrationId;
        $registration = $this->getRegistrationIdentity($registrationId);
        $result->registrationName = $registration->registrationName;
        $result->registrationCode = $registration->registrationCode;
        if ($includeLookups) {
            $result->lookups   = $this->getView('accountLookupsView');
        }
        else {
            $result->lookups   = array();
        }
        $result->donations = $this->getRegistrationItems($registrationId,'donationsView');
        $result->payments  = $this->getRegistrationItems($registrationId,'paymentsView');
        $result->charges   = $this->getRegistrationItems($registrationId,'chargesView');
        $result->credits   = $this->getRegistrationItems($registrationId,'creditsView');
        return $result;
    }

    public function getYouthList() {
        return $this->getReportView('youthView');
    }

    public function getHousingRequestCountsReport() {
        return $this->getReportView('housingRequestCountsReportView',false);
    }

    public function getHousingAssignmentCounts() {
        return $this->getReportView('housingAssignmentCountsReportView',false);
    }

    public function getHousingRoster() {
        return $this->getReportView('housingRosterView');
    }

    public function getOccupantsReport() {
        return $this->getReportView('occupantsView');
    }

    public function getHousingAvailability() {
        return $this->getReportView('housingAvailabilityView',false);
    }

    public function getRegistrationsReceivedReport(){
        return $this->getReportView('registrationsReceivedReportView');
    }

    public function getMealCountsReport(){
        return $this->getReportView('mealCountsView',false);
    }

    public function getMealRosterReport(){
        return $this->getReportView('mealRosterReportView');
    }

    public function getRegisteredAttendersReport(){
        return $this->getReportView('attendersReportView');
    }

    public function getAttendersByArrivalReport(){
        return $this->getReportView('arrivalTimeSummaryView');
    }

    public function getPaymentsReceivedReport(){
        return $this->getReportView('incomeView');
    }

    public function getLedgerReport(){
        $result = new \stdClass();
        $result->ledger = $this->getReportView('ledgerDetailView');
        $result->balanceSheet = $this->getReportView('balancesView');
        return $result;
    }

    public function getMiscCountsReport(){
        return $this->getReportView('registrarsReportView',false);
    }

    public function getFinancialAidReport(){
        return $this->getReportView('financialAidReportView');
    }

    public function getCreditsReport() {
        $result = new \stdClass();
        $result->report = $this->getReportView('creditsReportView');
        $result->creditTypes = $this->getCreditTypesLookupList();
        return $result;
    }

    public function getSubsidiesReport() {
        $result = new \stdClass();
        $result->report = $this->getReportView('subsidiesReportView');
        $result->creditTypes = $this->getCreditTypesLookupList();
        return $result;
    }

    public function getTransactionsDownload($attendedOnly = true) {
        return $this->getDownloadView('transactionsDownloadView',$attendedOnly);
    }

    public function getAttenderCountsDownload($attendedOnly = true) {
        return $this->getDownloadView('attenderCountsView',$attendedOnly);
    }

    public function getRegistrationCountsDownload() {
        return $this->getDownloadView('registrationCountsDownloadView',false);
    }

    public function getBalanceSheetDownload($attendedOnly = true) {
        return $this->getDownloadView('ledgerDownloadView',$attendedOnly);
    }

    public function getFinanceSummaryDownload() {
        return $this->getDownloadView('financeSummaryDownloadView',false,false);
    }

    public function getCampReportDownload() {
        return $this->getDownloadView('campReportDownloadView',false,false);
    }

    public function getNameTags($filter='', $order = '') {
        $qm = TQueryManager::getInstance();
        $sql = "SELECT * FROM nameTagsDownloadView ";
        switch ($filter) {
            case 'firsttimers' :
                $sql .= " WHERE firstTimer <> '' ";
                break;
            case 'nofirsttimers' :
                $sql .= " WHERE firstTimer = '' ";
                break;
        }

        switch($order) {
            case 'meeting' :
                $sql .= ' ORDER BY Affiliation ';
        }

        $statement = $qm->executeStatement($sql);
        $result = $statement->fetchAll(PDO::FETCH_OBJ);
        return $result;
    }

}
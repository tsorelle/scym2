<?php

namespace App\db\scym;

use App\db\DateStampedEntity;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\GeneratedValue;
use Doctrine\ORM\Mapping\Id;
use Doctrine\ORM\Mapping\Index;
use Doctrine\ORM\Mapping\Table;
use Tops\sys\TDateTime;


/**
 * Persons
 *
 * @Table(name="persons", indexes={@Index(name="PersonNames", columns={"lastName", "firstName"})})
 * @Entity @HasLifecycleCallbacks
 */
class ScymPerson extends DateStampedEntity
{
    /**
     * @var integer
     *
     * @Column(name="personID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $personid;


    /**
     * @var string
     *
     * @Column(name="firstName", type="string", length=50, nullable=true)
     */
    private $firstname;

    /**
     * @var string
     *
     * @Column(name="lastName", type="string", length=50, nullable=false)
     */
    private $lastname = '';

    /**
     * @var string
     *
     * @Column(name="middleName", type="string", length=50, nullable=true)
     */
    private $middlename;

    /**
     * @var string
     *
     * @Column(name="username", type="string", length=30, nullable=true)
     */
    protected $username;

    /**
     * @var ScymAddress
     *
     * @ManyToOne(targetEntity="ScymAddress",inversedBy="persons")
     * @JoinColumn(name="addressID", referencedColumnName="addressID")
     */
    protected $address;

    public function getAddressId()
    {
        return $this->address ? $this->address->getAddressid() : null;
    }

    /**
     * @var string
     *
     * @Column(name="phone", type="string", length=25, nullable=true)
     */
    private $phone;

    /**
     * @var string
     *
     * @Column(name="phone2", type="string", length=25, nullable=true)
     */
    private $phone2;

    /**
     * @var string
     *
     * @Column(name="email", type="string", length=50, nullable=true)
     */
    private $email;

    /**
     * @var boolean
     *
     * @Column(name="newsletter", type="boolean", nullable=false)
     */
    private $newsletter = '0';

    /**
     * @var \DateTime
     *
     * @Column(name="dateOfBirth", type="date", nullable=true)
     */
    private $dateOfBirth;

    /**
     * @var string
     *
     * @Column(name="organization", type="string", length=100, nullable=true)
     */
    private $organization;


    /**
     * @var string
     *
     * @Column(name="notes", type="string", length=200, nullable=true)
     */
    private $notes;

    /**
     * @var boolean
     *
     * @Column(name="junior", type="boolean", nullable=true)
     */
    private $junior = '0';

    /**
     * @var boolean
     *
     * @Column(name="active", type="boolean", nullable=true)
     */
    private $active = '1';

    /**
     * @var string
     *
     * @Column(name="sortkey", type="string", length=80, nullable=true)
     */
    private $sortkey;

    /**
     * @var string
     *
     * @Column(name="affiliationCode", type="string", length=30, nullable=true)
     */
    private $affiliationcode;


    /**
     * @var string
     *
     * @Column(name="memberAffiliation", type="string", length=30, nullable=true)
     */
    private $memberaffiliation;


    /**
     * @var string
     *
     * @Column(name="otherAffiliation", type="string", length=100, nullable=true)
     */
    private $otheraffiliation;

    /**
     * @var integer
     *
     * @Column(name="directoryListingTypeId", type="integer", nullable=false)
     */
    private $directoryListingTypeId = '1';



    /**
     * Get personid
     *
     * @return integer
     */
    public function getPersonid()
    {
        return $this->personid;
    }

    /**
     * Set firstname
     *
     * @param string $firstname
     * @return ScymPerson
     */
    public function setFirstname($firstname)
    {
        $this->firstname = $firstname;

        return $this;
    }

    /**
     * Get firstname
     *
     * @return string
     */
    public function getFirstname()
    {
        return $this->firstname;
    }

    /**
     * Set lastname
     *
     * @param string $lastname
     * @return ScymPerson
     */
    public function setLastname($lastname)
    {
        $this->lastname = $lastname;

        return $this;
    }

    /**
     * Get lastname
     *
     * @return string
     */
    public function getLastname()
    {
        return $this->lastname;
    }

    /**
     * Set middlename
     *
     * @param string $middlename
     * @return ScymPerson
     */
    public function setMiddlename($middlename)
    {
        $this->middlename = $middlename;

        return $this;
    }

    /**
     * Get middlename
     *
     * @return string
     */
    public function getMiddlename()
    {
        return $this->middlename;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return ScymPerson
     */
    public function setUsername($username)
    {
        $this->username = $username;

        return $this;
    }

    /**
     * Get username
     *
     * @return string
     */
    public function getUsername()
    {
        return $this->username;
    }



    /**
     * Set address
     *
     * @param ScymAddress $address
     * @return ScymPerson
     */
    public function setAddress(ScymAddress $address = null)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return ScymAddress
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set otheraffiliation
     *
     * @param string $otheraffiliation
     * @return ScymPerson
     */
    public function setOtherAffiliation($otheraffiliation)
    {
        $this->otheraffiliation = $otheraffiliation;

        return $this;
    }

    /**
     * Get otheraffiliation
     *
     * @return string
     */
    public function getOtherAffiliation()
    {
        return $this->otheraffiliation;
    }


    /**
     * Set directorylistingtypeid
     *
     * @param integer $directoryListingTypeId
     * @return ScymPerson
     */
    public function setDirectoryListingTypeId($directoryListingTypeId)
    {
        $this->directoryListingTypeId = $directoryListingTypeId;

        return $this;
    }

    /**
     * Get directorylistingtypeid
     *
     * @return integer
     */
    public function getDirectoryListingTypeId()
    {
        return $this->directoryListingTypeId;
    }





    /**
     * Set phone
     *
     * @param string $phone
     * @return ScymPerson
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set phone2
     *
     * @param string $phone2
     * @return ScymPerson
     */
    public function setPhone2($phone2)
    {
        $this->phone2 = $phone2;

        return $this;
    }

    /**
     * Get phone2
     *
     * @return string
     */
    public function getPhone2()
    {
        return $this->phone2;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return ScymPerson
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set newsletter
     *
     * @param boolean $newsletter
     * @return Persons
     */
    public function setNewsletter($newsletter)
    {
        $this->newsletter = $newsletter;

        return $this;
    }

    /**
     * Get newsletter
     *
     * @return boolean
     */
    public function getNewsletter()
    {
        return $this->newsletter;
    }



    /**
     * Set dateOfBirth
     *
     * @param \DateTime $dateOfBirth
     * @return ScymPerson
     */
    public function setDateOfBirth($dateOfBirth)
    {
        if (empty($dateOfBirth)) {
            $this->dateOfBirth = null;
        }
        else {
            $this->dateOfBirth = $dateOfBirth;
        }

        return $this;
    }

    /**
     * Get dateOfBirth
     *
     * @return \DateTime
     */
    public function getDateOfBirth()
    {
        return $this->dateOfBirth;
    }

    /**
     * Set organization
     *
     * @param string $organization
     * @return ScymPerson
     */
    public function setOrganization($organization)
    {
        $this->organization = $organization;

        return $this;
    }

    /**
     * Get organization
     *
     * @return string
     */
    public function getOrganization()
    {
        return $this->organization;
    }


    /**
     * Set notes
     *
     * @param string $notes
     * @return ScymPerson
     */
    public function setNotes($notes)
    {
        $this->notes = $notes;

        return $this;
    }

    /**
     * Get notes
     *
     * @return string
     */
    public function getNotes()
    {
        return $this->notes;
    }

    /**
     * Set junior
     *
     * @param boolean $junior
     * @return ScymPerson
     */
    public function setJunior($junior)
    {
        $this->junior = $junior;

        return $this;
    }

    /**
     * Get junior
     *
     * @return boolean
     */
    public function getJunior()
    {
        return $this->junior;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return ScymPerson
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean
     */
    public function getActive()
    {
        return $this->active;
    }

    /**
     * Set sortkey
     *
     * @param string $sortkey
     * @return ScymPerson
     */
    public function setSortkey($sortkey)
    {
        $this->sortkey = $sortkey;

        return $this;
    }

    /**
     * Get sortkey
     *
     * @return string
     */
    public function getSortkey()
    {
        return $this->sortkey;
    }

    /**
     * Set affiliationcode
     *
     * @param string $affiliationcode
     * @return ScymPerson
     */
    public function setAffiliationcode($affiliationcode)
    {
        $this->affiliationcode = $affiliationcode;

        return $this;
    }

    /**
     * Get affiliationcode
     *
     * @return string
     */
    public function getAffiliationcode()
    {
        return $this->affiliationcode;
    }

    /**
     * Set memberaffiliation
     *
     * @param string $memberaffiliation
     * @return ScymPerson
     */
    public function setMemberaffiliation($memberaffiliation)
    {
        $this->memberaffiliation = $memberaffiliation;

        return $this;
    }

    /**
     * Get memberaffiliation
     *
     * @return string
     */
    public function getMemberaffiliation()
    {
        return $this->memberaffiliation;
    }

    private function appendName($name, $next) {
        if (empty($name)) {
            $name = '';
        }
        if (!empty($next)) {
            if ($name) {
                $name .= ' ';
            }
            $name .= $next;
        }
        return $name;
    }

    public function getShortName() {
        $name = $this->appendName($this->firstname,$this->lastname);
        if (empty($name)) {
            return $this->getUserName();
        }
        return $name;

    }

    public function getFullName() {
        $name = $this->appendName($this->firstname,$this->middlename);
        $name = $this->appendName($name,$this->lastname);
        if (empty($name)) {
            return $this->username;
        }
        return $name;
    }

    /**
     * 1  Adult
     * 2  Youth (age 4 through 18)
     * 3  Young Friend (age 13 through 18)
     * 4  Child (age 4 through 12)
     * 5  Infant (through age 3)
     */

    /**
     * @return int
     */
    public function getGeneration() {
        $age = 21;
        $today = new \DateTime();
        $dob = $this->getDateOfBirth();
        if (TDateTime::isEmpty($dob)) {
            if ($this->getJunior()) {
                return 2;
            }
        }
        else {
            $i = date_diff($today,$dob);
            if ($i !== false) {
                $age = $i->y;
            }
        }
        if ($age > 18) {
            return 1;
        }
        if ($age >= 13) {
            return 3;
        }
        if ($age >= 4) {
            return 4;
        }
        return 5;
    }

    private function assignDob($dateString) {
        try {
            $dateValue = empty($dateString) ? null : new \DateTime($dateString);
            $this->dateOfBirth = $dateValue;
        }
        catch(\Exception $ex) {
            return false;
        }
        return true;
    }

    public function updateFromDataTransferObject($dto) {
        $valid = $this->assignDob($dto->dateOfBirth);
        if (!$valid) {
            return false;
        }
        $this->firstname= $dto->firstName;
        $this->middlename= $dto->middleName;
        $this->lastname= $dto->lastName;
        $this->username= $dto->username;
        $this->phone= $dto->phone;
        $this->phone2= $dto->phone2;
        $this->email= $dto->email;
        $this->newsletter= $dto->newsletter;
        $this->notes= $dto->notes;
        $this->junior= $dto->junior;
        $this->active= $dto->active;
        $this->sortkey= $dto->sortkey;
        $this->affiliationcode= $dto->affiliationcode;
        $this->otheraffiliation= $dto->otheraffiliation;
        $this->directoryListingTypeId = $dto->directorylistingtypeid;
        $this->organization= $dto->organization;
        $this->sortkey= $dto->sortkey;
        $this->memberaffiliation = $dto->memberaffiliation;
        return true;
    }

    public function getDataTransferObject() {
        $result = new \stdClass();

        $result->personId = $this->personid;
        $result->firstName= $this->firstname;
        $result->middleName= $this->middlename;
        $result->lastName= $this->lastname;
        $result->username = $this->username;
        $result->addressId = $this->getAddressId();
        $result->phone = $this->phone;
        $result->phone2= $this->phone2;
        $result->email = $this->email;
        $result->newsletter = $this->newsletter;
        $result->dateOfBirth = $this->formatDtoDate($this->dateOfBirth);
        $result->notes = $this->notes;
        $result->junior = $this->junior;
        $result->active = $this->active;
        $result->sortkey = $this->sortkey;
        $result->affiliationcode = $this->affiliationcode;
        $result->memberaffiliation = $this->memberaffiliation;
        $result->otheraffiliation = $this->otheraffiliation;
        $result->directorylistingtypeid = $this->directoryListingTypeId;
        $result->organization = $this->organization;
        $result->sortkey = $this->sortkey;
        $result->lastUpdate = $this->lastUpdateAsString();
        $result->id = $this->personid; // client side id
        $result->editState = 0; // unchanged

        return $result;
    }

}

<?php


namespace App\db\scym;

use App\db\api\AttenderDto;
use App\db\api\IRegistration;
use App\db\api\RegistrationAccount;
use App\db\api\RegistrationDto;
use App\db\DateStampedEntity;
use Doctrine\ORM\Mapping as ORM;
use Tops\sys\TKeyValuePair;
use Tops\sys\TListItem;

/**
 * ScymRegistration
 *
 * @Table(name="registrations", uniqueConstraints={@UniqueConstraint(name="registrationcode_idx", columns={"registrationCode"})})
 * @Entity @HasLifecycleCallbacks
 */
class ScymRegistration extends DateStampedEntity implements IRegistration
{
    /**
     * @OneToMany(targetEntity="ScymAttender", mappedBy="registration",fetch="EXTRA_LAZY", cascade={"persist", "remove"})
     */
    protected $attenders;

    public function addAttender(ScymAttender $attender) {
        $this->attenders[] = $attender;
        $attender->setRegistration($this);
        return $this;
    }

    public function removeAttender(ScymAttender $attender) {
        $this->attenders->removeElement($attender);
    }

    public function findAttender($id) {
        $attenders = $this->getAttenders();
        foreach ($attenders as $attender) {
            /**
             * @var $attender ScymAttender
             */
            if ($attender->getAttenderId() == $id) {
                return $attender;
            }
        }
        return null;
    }

    public function findPayment($id) {
        $payments = $this->getPayments();
        foreach ($payments as $payment) {
            /**
             * @var $payment ScymPayment
             */
            if ($payment->getPaymentId() == $id) {
                return $payment;
            }
        }
        return null;
    }

    public function findCredit($id) {
        $credits = $this->getCredits();
        foreach ($credits as $credit) {
            /**
             * @var $attender ScymCredit
             */
            if ($credit->getCreditId() == $id) {
                return $credit;
            }
        }
        return null;
    }

    public function findCharge($id) {
        $charges = $this->getCharges();
        foreach ($charges as $charge) {
            /**
             * @var $charge ScymCharge
             */
            if ($charge->getChargeId() == $id) {
                return $charge;
            }
        }
        return null;
    }

    public function findDonation($id) {
        $donations = $this->getDonations();
        foreach ($donations as $donation) {
            /**
             * @var $donation ScymDonation
             */
            if ($donation->getDonationId() == $id) {
                return $donation;
            }
        }
        return null;
    }


    public function removeAttenderById($id) {
        $attender = $this->findAttender($id);
        if ($attender) {
            $this->attenders->removeElement($attender);
        }
        return $attender;
    }

    public function removePaymentById($id) {
        $payment = $this->findPayment($id);
        if ($payment) {
            $this->payments->removeElement($payment);
        }
        return $payment;
    }

    public function removeChargeById($id) {
        $charge = $this->findCharge($id);
        if ($charge) {
            $this->charges->removeElement($charge);
        }
        return $charge;
    }
    public function removeCreditById($id) {
        $credit = $this->findCredit($id);
        if ($credit) {
            $this->credits->removeElement($credit);
        }
        return $credit;
    }

    public function removeDonationById($id) {
        $donation = $this->findDonation($id);
        if ($donation) {
            $this->donations->removeElement($donation);
        }
        return $donation;
    }


    public function removeAccountItems() {
        $removed = array();
        $credits = $this->getCredits()->toArray();
        foreach ($credits as $credit) {
            /**
             * @var $credit ScymCredit
             */
            if ($credit->getCreditid() != 999) { // do not remove manually entered credit
                $this->credits->removeElement($credit);
                array_push($removed,$credit);
            }
        }

        $charges = $this->getCharges()->toArray();
        foreach ($charges as $charge) {
            /**
             * @var $charge ScymCharge
             */
            if ($charge->getFeetypeid() != 999) { // do not remove manually entered charge
                $this->charges->removeElement($charge);
                array_push($removed,$charge);
            }
        }

        return $removed;
    }

    public function updateDonations(array $donationItems) {
        $removed = array();
        $donations = $this->getDonations()->toArray();
        foreach ($donations as $donation) {
            /**
             * @var $charge ScymDonation
             */
            $this->donations->removeElement($donation);
            array_push($removed,$donation);
        }

        foreach ($donationItems as $donationItem) {
            /**
             * @var $donationItem TKeyValuePair
             */
            if ((!empty($donationItem->Value) && $donationItem->Value > 0.00)) {
                $newDonation = ScymDonation::createDonation($donationItem->Key, $donationItem->Value);
                $this->addDonation($newDonation);
            }
        }

        return $removed;
    }

    /**
     * @OneToMany(targetEntity="ScymCharge", mappedBy="registration",fetch="EXTRA_LAZY", cascade={"persist", "remove"})
     */
    protected $charges;

    public function addcharge(ScymCharge $charge) {
        $this->charges[] = $charge;
        $charge->setRegistration($this);
        return $this;
    }

    public function removecharge(ScymCharge $charge) {
        $this->charges->removeElement($charge);
    }

    /**
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getCharges()  {
        return $this->charges;
    }

    /* ------- Credits -------------------- */
    /**
     * @OneToMany(targetEntity="ScymCredit", mappedBy="registration",fetch="EXTRA_LAZY", cascade={"persist", "remove"})
     */
    protected $credits;

    public function addCredit(ScymCredit $credit) {
        $this->credits[] = $credit;
        $credit->setRegistration($this);
        return $this;
    }

    public function removeCredit(ScymCredit $credit) {
        $this->credits->removeElement($credit);
    }

    /**
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getCredits()  {
        return $this->credits;
    }

    /* -------------- Donations ------------- */


    /**
     * @OneToMany(targetEntity="ScymDonation", mappedBy="registration",fetch="EXTRA_LAZY", cascade={"persist", "remove"})
     */
    protected $donations;

    public function addDonation(ScymDonation $donation) {
        $this->donations[] = $donation;
        $donation->setRegistration($this);
        return $this;
    }

    public function removeDonation(ScymDonation $donation) {
        $this->donations->removeElement($donation);
    }


    /**
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getDonations()  {
        return $this->donations;
    }

    public function __construct() {
        $this->attenders = new \Doctrine\Common\Collections\ArrayCollection();
        $this->charges = new \Doctrine\Common\Collections\ArrayCollection();
        $this->credits = new \Doctrine\Common\Collections\ArrayCollection();
        $this->donations = new \Doctrine\Common\Collections\ArrayCollection();
        $this->payments = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getAttenders()  {
        return $this->attenders;
    }

    /* ------------ Payments --------------- */

    /**
     * @OneToMany(targetEntity="ScymPayment", mappedBy="registration",fetch="EXTRA_LAZY", cascade={"persist", "remove"})
     */
    protected $payments;

    public function addPayment(ScymPayment $payment) {
        $this->payments[] = $payment;
        $payment->setRegistration($this);
        return $this;
    }

    public function removePayment(ScymPayment $payment) {
        $this->payments->removeElement($payment);
    }

    /**
     * @return \Doctrine\Common\Collections\ArrayCollection
     */
    public function getPayments()  {
        return $this->payments;
    }

    /* ------ Fields ---- */

    /**
     * @var integer
     *
     * @Column(name="registrationId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $registrationId;

    /**
     * @var boolean
     *
     * @Column(name="active", type="boolean", nullable=false)
     */
    private $active = '1';

    /**
     * @var boolean
     *
     * @Column(name="confirmed", type="boolean", nullable=false)
     */
    private $confirmed = '1';

    /**
     * @var string
     *
     * @Column(name="year", type="string", length=4, nullable=true)
     */
    private $year;

    /**
     * @var string
     *
     * @Column(name="registrationCode", type="string", length=100, nullable=false)
     */
    private $registrationCode;

    /**
     * @var integer
     *
     * @Column(name="statusId", type="integer", nullable=false)
     */
    private $statusId = '1'; // lookup: registration statustypes

    /**
     * @var string
     *
     * @Column(name="username", type="string", length=100, nullable=true)
     */
    private $username;


    /**
     * @var string
     *
     * @Column(name="name", type="string", length=50, nullable=false)
     */
    private $name;

    /**
     * @var string
     *
     * @Column(name="address", type="string", length=200, nullable=true)
     */
    private $address;

    /**
     * @var string
     *
     * @Column(name="city", type="string", length=200, nullable=true)
     */
    private $city;

    /**
     * @var string
     *
     * @Column(name="phone", type="string", length=25, nullable=true)
     */
    private $phone;

    /**
     * @var string
     *
     * @Column(name="email", type="string", length=80, nullable=true)
     */
    private $email;

    /**
     * @var \DateTime
     *
     * @Column(name="receivedDate", type="date", nullable=true)
     */
    private $receivedDate;

    /**
     * @var string
     *
     * @Column(name="notes", type="text", nullable=true)
     */
    private $notes;


    /**
     * @var string
     *
     * @Column(name="scymNotes", type="text", nullable=true)
     */
    private $scymNotes;

    /**
     * @var \DateTime
     *
     * @Column(name="statusDate", type="date", nullable=true)
     */
    private $statusDate;

    /**
     * @var string
     *
     * @Column(name="financialAidAmount", type="decimal", precision=12, scale=2, nullable=false)
     */
    private $financialAidAmount = '0.00';


    /**
     * Get registrationId
     *
     * @return integer 
     */
    public function getRegistrationId()
    {
        return $this->registrationId;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return ScymRegistration
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
     * Set confirmed
     *
     * @param boolean $confirmed
     * @return ScymRegistration
     */
    public function setConfirmed($confirmed)
    {
        $this->confirmed = $confirmed;

        return $this;
    }

    /**
     * Get confirmed
     *
     * @return boolean
     */
    public function getConfirmed()
    {
        return $this->confirmed;
    }

    /**
     * Set year
     *
     * @param string $year
     * @return ScymRegistration
     */
    public function setYear($year)
    {
        $this->year = $year;

        return $this;
    }

    /**
     * Get year
     *
     * @return string 
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Set registrationCode
     *
     * @param string $registrationCode
     * @return ScymRegistration
     */
    public function setRegistrationCode($registrationCode)
    {
        $this->registrationCode = $registrationCode;

        return $this;
    }

    /**
     * Get registrationCode
     *
     * @return string 
     */
    public function getRegistrationCode()
    {
        return $this->registrationCode;
    }

    /**
     * Set statusId
     *
     * @param integer $statusId
     * @return ScymRegistration
     */
    public function setStatusId($statusId)
    {
        if ($statusId == 1 || $statusId > $this->statusId) {
            $this->statusDate = new \DateTime();
        }
        if ($this->receivedDate == null && $statusId > 1) {
            $this->receivedDate = new \DateTime();
        }

        $this->statusId = $statusId;
        return $this;
    }

    /**
     * Get statusId
     *
     * @return integer 
     */
    public function getStatusId()
    {
        return $this->statusId;
    }

    /**
     * Set username
     *
     * @param string $name
     * @return ScymRegistration
     */
    public function setUsername($value)
    {
        $this->username = $value;

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
     * Set name
     *
     * @param string $name
     * @return ScymRegistration
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set address
     *
     * @param string $address
     * @return ScymRegistration
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string 
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set city
     *
     * @param string $city
     * @return ScymRegistration
     */
    public function setCity($city)
    {
        $this->city = $city;

        return $this;
    }

    /**
     * Get city
     *
     * @return string 
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set phone
     *
     * @param string $phone
     * @return ScymRegistration
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
     * Set email
     *
     * @param string $email
     * @return ScymRegistration
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
     * Set receivedDate
     *
     * @param \DateTime $receivedDate
     * @return ScymRegistration
     */
    public function setReceivedDate($receivedDate)
    {
        $this->receivedDate = $receivedDate;

        return $this;
    }

    /**
     * Get receivedDate
     *
     * @return \DateTime 
     */
    public function getReceivedDate()
    {
        return $this->receivedDate;
    }

    /**
     * Set notes
     *
     * @param string $notes
     * @return ScymRegistration
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
     * Set scymNotes
     *
     * @param string $scymNotes
     * @return ScymRegistration
     */
    public function setScymNotes($scymNotes)
    {
        $this->scymNotes = $scymNotes;

        return $this;
    }

    /**
     * Get scymNotes
     *
     * @return string 
     */
    public function getScymNotes()
    {
        return $this->scymNotes;
    }

    /**
     * Set statusDate
     *
     * @param \DateTime $statusDate
     * @return ScymRegistration
     */
    public function setStatusDate($statusDate)
    {
        $this->statusDate = $statusDate;

        return $this;
    }

    /**
     * Get statusDate
     *
     * @return \DateTime 
     */
    public function getStatusDate()
    {
        return $this->statusDate;
    }

    /**
     * Set financialAidAmount
     *
     * @param string $financialAidAmount
     * @return ScymRegistration
     */
    public function setFinancialAidAmount($financialAidAmount)
    {
        $this->financialAidAmount = $financialAidAmount;

        return $this;
    }

    /**
     * Get financialAidAmount
     *
     * @return string 
     */
    public function getFinancialAidAmount()
    {
        return $this->financialAidAmount;
    }

    /**
     * @return \stdClass
     */
    public function getDataTransferObject() {
        $result = new \stdClass();
        $result->registrationId           = $this->getRegistrationId();
        $result->registrationCode         = $this->getRegistrationCode();
        $result->name                     = $this->getName();
        $result->address                  = $this->getAddress();
        $result->city                     = $this->getCity  ();
        $result->phone                    = $this->getPhone ();
        $result->email                    = $this->getEmail ();
        $result->notes                    = $this->getNotes ();
        $result->scymNotes                = $this->getScymNotes();
        $result->active                   = $this->getActive();
        $result->financialAidAmount       = $this->getFinancialAidAmount();
        $result->statusId                 = $this->getStatusId();
        $result->confirmed                = $this->getConfirmed();
        $result->statusDate               = $this->formatDtoDate($this->getStatusDate());
        $result->receivedDate             = $this->formatDtoDate($this->getReceivedDate());

        // may be obsolete
        // $result->feesReceivedDate         = $this->formatDtoDate($this->feesReceivedDate);
        // $result->financialAidContribution = $this->financialAidContribution;
        // $result->contactRequested         = $this->contactRequested;
        // $result->attended                 = $this->attended;
        // $result->amountPaid               = $this->amountPaid;
        // $result->arrivalTime              = $this->arrivalTime;
        // $result->departureTime            = $this->departureTime;

        return $result;
    }

    public static function createNewRegistration(RegistrationDto $dto) {
        $result = new ScymRegistration();

        $result->updateFromDataTransferObject($dto);
        return $result;
    }

    public function updateFromDataTransferObject(RegistrationDto $dto, $updateAdminFields = false)
    {
        if ($dto->getRegistrationId() < 1) {
            $this->setRegistrationCode($dto->getRegistrationCode());
        }

        $year = $dto->getYear();
        if (!empty($year)) {
            $this->setYear($year);
        }

        // $this->setStatusId($dto->getStatusId());
        $this->setName( $dto->getName());
        $this->setAddress( $dto->getAddress());
        $this->setCity( $dto->getCity());
        $this->setPhone( $dto->getPhone());
        $this->setEmail( $dto->getEmail());
        $this->setNotes ( $dto->getNotes());
        $this->setFinancialAidAmount( $dto->getFinancialAidAmount());

        if ($updateAdminFields) {
            $this->scymNotes = $dto->getScymNotes();
            // obsolete?
            // $this->feesReceivedDate = $dto->getFeesReceivedDate();
            // $this->amountPaid               = $dto->getAmountPaid();
            // $this->arrivalTime              = $dto->getArrivalTime();
            // $this->departureTime            = $dto->getDepartureTime();
        }

        return true;
    }

    public function addAccountItems(RegistrationAccount $account) {
        $charges = $account->getCharges();
        foreach ($charges as $charge) {
            $this->addcharge($charge);
        }
        $credits = $account->getCredits();
        foreach ($credits as $credit) {
            $this->addCredit($credit);
        }
    }

    /**
     * @return TListItem[]
     */
    public function getAttenderList()
    {
        $result = array();
        $attenders = $this->getAttenders()->toArray();
        foreach ($attenders as $attender) {
            /**
             * @var $attender ScymAttender
             */
            TListItem::AddToArray($result,$attender->getFullName(),$attender->getAttenderId());
        }
        return $result;
    }

    /**
     * @param array $attenderUpdates  IAttender[]
     */
    public function updateAttenders(array $attenderUpdates) {
        $updatedYouth = array();
        foreach ($attenderUpdates as $dto) {
            /**
             * @var $dto AttenderDto
             */
            $id = $dto->getAttenderId();
            if ($id < 1) {
                /**
                 * @var $dto AttenderDto
                 */
                $attender = ScymAttender::CreateAttender($dto);
                $this->addAttender($attender);
            }
            else {
                $attender = $this->findAttender($id);
                $removeYouth = ($attender->getGenerationId() > 1 && $dto->getGenerationId() == 1);
                $attender->updateFromDataTransferObject($dto);
                if ($removeYouth) {
                    array_push($updatedYouth, $attender);
                }
                $mealtimes = $dto->getMeals();
                if ($mealtimes != null) {
                    $attender->updateMeals($mealtimes);
                }
            }
        }
        return $updatedYouth;
    }

    public function addAttenders(array $newAttenders) {
        foreach($newAttenders as $dto) {
            /**
             * @var $dto AttenderDto
             */
            $attender = ScymAttender::CreateAttender($dto);
            $this->addAttender($attender);
        }

    }


}

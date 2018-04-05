<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Registrations
 *
 * @Table(name="registrations")
 * @Entity
 */
class Registrations
{
    /**
     * @var integer
     *
     * @Column(name="registrationId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $registrationid;

    /**
     * @var string
     *
     * @Column(name="registrationIdCode", type="string", length=30, nullable=true)
     */
    private $registrationidcode;

    /**
     * @var string
     *
     * @Column(name="addressName", type="string", length=50, nullable=true)
     */
    private $addressname;

    /**
     * @var string
     *
     * @Column(name="address1", type="string", length=50, nullable=true)
     */
    private $address1;

    /**
     * @var string
     *
     * @Column(name="address2", type="string", length=50, nullable=true)
     */
    private $address2;

    /**
     * @var string
     *
     * @Column(name="city", type="string", length=40, nullable=true)
     */
    private $city;

    /**
     * @var string
     *
     * @Column(name="state", type="string", length=2, nullable=true)
     */
    private $state;

    /**
     * @var string
     *
     * @Column(name="postalCode", type="string", length=20, nullable=true)
     */
    private $postalcode;

    /**
     * @var string
     *
     * @Column(name="country", type="string", length=25, nullable=true)
     */
    private $country;

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
     * @Column(name="receivedDate", type="date", nullable=false)
     */
    private $receiveddate = '0000-00-00';

    /**
     * @var string
     *
     * @Column(name="amountPaid", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $amountpaid;

    /**
     * @var integer
     *
     * @Column(name="gatheringID", type="integer", nullable=false)
     */
    private $gatheringid = '0';

    /**
     * @var integer
     *
     * @Column(name="addressID", type="integer", nullable=true)
     */
    private $addressid;

    /**
     * @var string
     *
     * @Column(name="notes", type="text", nullable=true)
     */
    private $notes;

    /**
     * @var \DateTime
     *
     * @Column(name="feesReceivedDate", type="date", nullable=true)
     */
    private $feesreceiveddate;

    /**
     * @var boolean
     *
     * @Column(name="contactRequested", type="boolean", nullable=true)
     */
    private $contactrequested = '0';

    /**
     * @var boolean
     *
     * @Column(name="arrivalTime", type="boolean", nullable=true)
     */
    private $arrivaltime;

    /**
     * @var boolean
     *
     * @Column(name="departureTime", type="boolean", nullable=true)
     */
    private $departuretime;

    /**
     * @var string
     *
     * @Column(name="scymNotes", type="text", nullable=true)
     */
    private $scymnotes;

    /**
     * @var \DateTime
     *
     * @Column(name="cancelledDate", type="date", nullable=true)
     */
    private $cancelleddate;

    /**
     * @var \DateTime
     *
     * @Column(name="confirmedDate", type="date", nullable=true)
     */
    private $confirmeddate;

    /**
     * @var boolean
     *
     * @Column(name="active", type="boolean", nullable=true)
     */
    private $active = '1';

    /**
     * @var string
     *
     * @Column(name="YMDonation", type="decimal", precision=12, scale=2, nullable=true)
     */
    private $ymdonation;

    /**
     * @var string
     *
     * @Column(name="simpleMealDonation", type="decimal", precision=12, scale=2, nullable=true)
     */
    private $simplemealdonation;

    /**
     * @var boolean
     *
     * @Column(name="financialAidRequested", type="boolean", nullable=true)
     */
    private $financialaidrequested = '0';

    /**
     * @var string
     *
     * @Column(name="financialAidContribution", type="decimal", precision=12, scale=2, nullable=true)
     */
    private $financialaidcontribution;

    /**
     * @var boolean
     *
     * @Column(name="attended", type="boolean", nullable=true)
     */
    private $attended = '0';

    /**
     * @var string
     *
     * @Column(name="financialAidAmount", type="decimal", precision=12, scale=2, nullable=false)
     */
    private $financialaidamount = '0.00';


    /**
     * Get registrationid
     *
     * @return integer 
     */
    public function getRegistrationid()
    {
        return $this->registrationid;
    }

    /**
     * Set registrationidcode
     *
     * @param string $registrationidcode
     * @return Registrations
     */
    public function setRegistrationidcode($registrationidcode)
    {
        $this->registrationidcode = $registrationidcode;

        return $this;
    }

    /**
     * Get registrationidcode
     *
     * @return string 
     */
    public function getRegistrationidcode()
    {
        return $this->registrationidcode;
    }

    /**
     * Set addressname
     *
     * @param string $addressname
     * @return Registrations
     */
    public function setAddressname($addressname)
    {
        $this->addressname = $addressname;

        return $this;
    }

    /**
     * Get addressname
     *
     * @return string 
     */
    public function getAddressname()
    {
        return $this->addressname;
    }

    /**
     * Set address1
     *
     * @param string $address1
     * @return Registrations
     */
    public function setAddress1($address1)
    {
        $this->address1 = $address1;

        return $this;
    }

    /**
     * Get address1
     *
     * @return string 
     */
    public function getAddress1()
    {
        return $this->address1;
    }

    /**
     * Set address2
     *
     * @param string $address2
     * @return Registrations
     */
    public function setAddress2($address2)
    {
        $this->address2 = $address2;

        return $this;
    }

    /**
     * Get address2
     *
     * @return string 
     */
    public function getAddress2()
    {
        return $this->address2;
    }

    /**
     * Set city
     *
     * @param string $city
     * @return Registrations
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
     * Set state
     *
     * @param string $state
     * @return Registrations
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return string 
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set postalcode
     *
     * @param string $postalcode
     * @return Registrations
     */
    public function setPostalcode($postalcode)
    {
        $this->postalcode = $postalcode;

        return $this;
    }

    /**
     * Get postalcode
     *
     * @return string 
     */
    public function getPostalcode()
    {
        return $this->postalcode;
    }

    /**
     * Set country
     *
     * @param string $country
     * @return Registrations
     */
    public function setCountry($country)
    {
        $this->country = $country;

        return $this;
    }

    /**
     * Get country
     *
     * @return string 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set phone
     *
     * @param string $phone
     * @return Registrations
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
     * @return Registrations
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
     * Set receiveddate
     *
     * @param \DateTime $receiveddate
     * @return Registrations
     */
    public function setReceiveddate($receiveddate)
    {
        $this->receiveddate = $receiveddate;

        return $this;
    }

    /**
     * Get receiveddate
     *
     * @return \DateTime 
     */
    public function getReceiveddate()
    {
        return $this->receiveddate;
    }

    /**
     * Set amountpaid
     *
     * @param string $amountpaid
     * @return Registrations
     */
    public function setAmountpaid($amountpaid)
    {
        $this->amountpaid = $amountpaid;

        return $this;
    }

    /**
     * Get amountpaid
     *
     * @return string 
     */
    public function getAmountpaid()
    {
        return $this->amountpaid;
    }

    /**
     * Set gatheringid
     *
     * @param integer $gatheringid
     * @return Registrations
     */
    public function setGatheringid($gatheringid)
    {
        $this->gatheringid = $gatheringid;

        return $this;
    }

    /**
     * Get gatheringid
     *
     * @return integer 
     */
    public function getGatheringid()
    {
        return $this->gatheringid;
    }

    /**
     * Set addressid
     *
     * @param integer $addressid
     * @return Registrations
     */
    public function setAddressid($addressid)
    {
        $this->addressid = $addressid;

        return $this;
    }

    /**
     * Get addressid
     *
     * @return integer 
     */
    public function getAddressid()
    {
        return $this->addressid;
    }

    /**
     * Set notes
     *
     * @param string $notes
     * @return Registrations
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
     * Set feesreceiveddate
     *
     * @param \DateTime $feesreceiveddate
     * @return Registrations
     */
    public function setFeesreceiveddate($feesreceiveddate)
    {
        $this->feesreceiveddate = $feesreceiveddate;

        return $this;
    }

    /**
     * Get feesreceiveddate
     *
     * @return \DateTime 
     */
    public function getFeesreceiveddate()
    {
        return $this->feesreceiveddate;
    }

    /**
     * Set contactrequested
     *
     * @param boolean $contactrequested
     * @return Registrations
     */
    public function setContactrequested($contactrequested)
    {
        $this->contactrequested = $contactrequested;

        return $this;
    }

    /**
     * Get contactrequested
     *
     * @return boolean 
     */
    public function getContactrequested()
    {
        return $this->contactrequested;
    }

    /**
     * Set arrivaltime
     *
     * @param boolean $arrivaltime
     * @return Registrations
     */
    public function setArrivaltime($arrivaltime)
    {
        $this->arrivaltime = $arrivaltime;

        return $this;
    }

    /**
     * Get arrivaltime
     *
     * @return boolean 
     */
    public function getArrivaltime()
    {
        return $this->arrivaltime;
    }

    /**
     * Set departuretime
     *
     * @param boolean $departuretime
     * @return Registrations
     */
    public function setDeparturetime($departuretime)
    {
        $this->departuretime = $departuretime;

        return $this;
    }

    /**
     * Get departuretime
     *
     * @return boolean 
     */
    public function getDeparturetime()
    {
        return $this->departuretime;
    }

    /**
     * Set scymnotes
     *
     * @param string $scymnotes
     * @return Registrations
     */
    public function setScymnotes($scymnotes)
    {
        $this->scymnotes = $scymnotes;

        return $this;
    }

    /**
     * Get scymnotes
     *
     * @return string 
     */
    public function getScymnotes()
    {
        return $this->scymnotes;
    }

    /**
     * Set cancelleddate
     *
     * @param \DateTime $cancelleddate
     * @return Registrations
     */
    public function setCancelleddate($cancelleddate)
    {
        $this->cancelleddate = $cancelleddate;

        return $this;
    }

    /**
     * Get cancelleddate
     *
     * @return \DateTime 
     */
    public function getCancelleddate()
    {
        return $this->cancelleddate;
    }

    /**
     * Set confirmeddate
     *
     * @param \DateTime $confirmeddate
     * @return Registrations
     */
    public function setConfirmeddate($confirmeddate)
    {
        $this->confirmeddate = $confirmeddate;

        return $this;
    }

    /**
     * Get confirmeddate
     *
     * @return \DateTime 
     */
    public function getConfirmeddate()
    {
        return $this->confirmeddate;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return Registrations
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
     * Set ymdonation
     *
     * @param string $ymdonation
     * @return Registrations
     */
    public function setYmdonation($ymdonation)
    {
        $this->ymdonation = $ymdonation;

        return $this;
    }

    /**
     * Get ymdonation
     *
     * @return string 
     */
    public function getYmdonation()
    {
        return $this->ymdonation;
    }

    /**
     * Set simplemealdonation
     *
     * @param string $simplemealdonation
     * @return Registrations
     */
    public function setSimplemealdonation($simplemealdonation)
    {
        $this->simplemealdonation = $simplemealdonation;

        return $this;
    }

    /**
     * Get simplemealdonation
     *
     * @return string 
     */
    public function getSimplemealdonation()
    {
        return $this->simplemealdonation;
    }

    /**
     * Set financialaidrequested
     *
     * @param boolean $financialaidrequested
     * @return Registrations
     */
    public function setFinancialaidrequested($financialaidrequested)
    {
        $this->financialaidrequested = $financialaidrequested;

        return $this;
    }

    /**
     * Get financialaidrequested
     *
     * @return boolean 
     */
    public function getFinancialaidrequested()
    {
        return $this->financialaidrequested;
    }

    /**
     * Set financialaidcontribution
     *
     * @param string $financialaidcontribution
     * @return Registrations
     */
    public function setFinancialaidcontribution($financialaidcontribution)
    {
        $this->financialaidcontribution = $financialaidcontribution;

        return $this;
    }

    /**
     * Get financialaidcontribution
     *
     * @return string 
     */
    public function getFinancialaidcontribution()
    {
        return $this->financialaidcontribution;
    }

    /**
     * Set attended
     *
     * @param boolean $attended
     * @return Registrations
     */
    public function setAttended($attended)
    {
        $this->attended = $attended;

        return $this;
    }

    /**
     * Get attended
     *
     * @return boolean 
     */
    public function getAttended()
    {
        return $this->attended;
    }

    /**
     * Set financialaidamount
     *
     * @param string $financialaidamount
     * @return Registrations
     */
    public function setFinancialaidamount($financialaidamount)
    {
        $this->financialaidamount = $financialaidamount;

        return $this;
    }

    /**
     * Get financialaidamount
     *
     * @return string 
     */
    public function getFinancialaidamount()
    {
        return $this->financialaidamount;
    }
}

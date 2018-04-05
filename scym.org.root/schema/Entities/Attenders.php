<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Attenders
 *
 * @Table(name="attenders")
 * @Entity
 */
class Attenders
{
    /**
     * @var integer
     *
     * @Column(name="attenderID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $attenderid;

    /**
     * @var integer
     *
     * @Column(name="registrationId", type="integer", nullable=true)
     */
    private $registrationid;

    /**
     * @var string
     *
     * @Column(name="firstName", type="string", length=50, nullable=false)
     */
    private $firstname = '';

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
     * @var \DateTime
     *
     * @Column(name="dateOfBirth", type="date", nullable=true)
     */
    private $dateofbirth;

    /**
     * @var integer
     *
     * @Column(name="affiliationId", type="integer", nullable=true)
     */
    private $affiliationid;

    /**
     * @var string
     *
     * @Column(name="otherAffiliation", type="string", length=30, nullable=true)
     */
    private $otheraffiliation;

    /**
     * @var integer
     *
     * @Column(name="personID", type="integer", nullable=false)
     */
    private $personid = '0';

    /**
     * @var boolean
     *
     * @Column(name="firstTimer", type="boolean", nullable=true)
     */
    private $firsttimer = '0';

    /**
     * @var boolean
     *
     * @Column(name="teacher", type="boolean", nullable=true)
     */
    private $teacher = '0';

    /**
     * @var boolean
     *
     * @Column(name="financialAidRequested", type="boolean", nullable=true)
     */
    private $financialaidrequested = '0';

    /**
     * @var boolean
     *
     * @Column(name="guest", type="boolean", nullable=true)
     */
    private $guest = '0';

    /**
     * @var string
     *
     * @Column(name="notes", type="text", nullable=true)
     */
    private $notes;

    /**
     * @var boolean
     *
     * @Column(name="linens", type="boolean", nullable=true)
     */
    private $linens = '0';

    /**
     * @var integer
     *
     * @Column(name="specialNeeds", type="integer", nullable=true)
     */
    private $specialneeds;

    /**
     * @var boolean
     *
     * @Column(name="arrivalTime", type="boolean", nullable=true)
     */
    private $arrivaltime = '41';

    /**
     * @var boolean
     *
     * @Column(name="departureTime", type="boolean", nullable=true)
     */
    private $departuretime = '72';

    /**
     * @var integer
     *
     * @Column(name="housing", type="integer", nullable=true)
     */
    private $housing;

    /**
     * @var boolean
     *
     * @Column(name="vegetarian", type="boolean", nullable=true)
     */
    private $vegetarian = '0';

    /**
     * @var boolean
     *
     * @Column(name="attended", type="boolean", nullable=true)
     */
    private $attended = '0';

    /**
     * @var boolean
     *
     * @Column(name="generation", type="boolean", nullable=true)
     */
    private $generation = '1';

    /**
     * @var string
     *
     * @Column(name="gradeLevel", type="string", length=2, nullable=true)
     */
    private $gradelevel;

    /**
     * @var integer
     *
     * @Column(name="ageGroup", type="integer", nullable=true)
     */
    private $agegroup;

    /**
     * @var integer
     *
     * @Column(name="feeCredit", type="integer", nullable=true)
     */
    private $feecredit = '0';

    /**
     * @var boolean
     *
     * @Column(name="singleOccupant", type="boolean", nullable=true)
     */
    private $singleoccupant = '0';


    /**
     * Get attenderid
     *
     * @return integer 
     */
    public function getAttenderid()
    {
        return $this->attenderid;
    }

    /**
     * Set registrationid
     *
     * @param integer $registrationid
     * @return Attenders
     */
    public function setRegistrationid($registrationid)
    {
        $this->registrationid = $registrationid;

        return $this;
    }

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
     * Set firstname
     *
     * @param string $firstname
     * @return Attenders
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
     * @return Attenders
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
     * @return Attenders
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
     * Set dateofbirth
     *
     * @param \DateTime $dateofbirth
     * @return Attenders
     */
    public function setDateofbirth($dateofbirth)
    {
        $this->dateofbirth = $dateofbirth;

        return $this;
    }

    /**
     * Get dateofbirth
     *
     * @return \DateTime 
     */
    public function getDateofbirth()
    {
        return $this->dateofbirth;
    }

    /**
     * Set affiliationid
     *
     * @param integer $affiliationid
     * @return Attenders
     */
    public function setAffiliationid($affiliationid)
    {
        $this->affiliationid = $affiliationid;

        return $this;
    }

    /**
     * Get affiliationid
     *
     * @return integer 
     */
    public function getAffiliationid()
    {
        return $this->affiliationid;
    }

    /**
     * Set otheraffiliation
     *
     * @param string $otheraffiliation
     * @return Attenders
     */
    public function setOtheraffiliation($otheraffiliation)
    {
        $this->otheraffiliation = $otheraffiliation;

        return $this;
    }

    /**
     * Get otheraffiliation
     *
     * @return string 
     */
    public function getOtheraffiliation()
    {
        return $this->otheraffiliation;
    }

    /**
     * Set personid
     *
     * @param integer $personid
     * @return Attenders
     */
    public function setPersonid($personid)
    {
        $this->personid = $personid;

        return $this;
    }

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
     * Set firsttimer
     *
     * @param boolean $firsttimer
     * @return Attenders
     */
    public function setFirsttimer($firsttimer)
    {
        $this->firsttimer = $firsttimer;

        return $this;
    }

    /**
     * Get firsttimer
     *
     * @return boolean 
     */
    public function getFirsttimer()
    {
        return $this->firsttimer;
    }

    /**
     * Set teacher
     *
     * @param boolean $teacher
     * @return Attenders
     */
    public function setTeacher($teacher)
    {
        $this->teacher = $teacher;

        return $this;
    }

    /**
     * Get teacher
     *
     * @return boolean 
     */
    public function getTeacher()
    {
        return $this->teacher;
    }

    /**
     * Set financialaidrequested
     *
     * @param boolean $financialaidrequested
     * @return Attenders
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
     * Set guest
     *
     * @param boolean $guest
     * @return Attenders
     */
    public function setGuest($guest)
    {
        $this->guest = $guest;

        return $this;
    }

    /**
     * Get guest
     *
     * @return boolean 
     */
    public function getGuest()
    {
        return $this->guest;
    }

    /**
     * Set notes
     *
     * @param string $notes
     * @return Attenders
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
     * Set linens
     *
     * @param boolean $linens
     * @return Attenders
     */
    public function setLinens($linens)
    {
        $this->linens = $linens;

        return $this;
    }

    /**
     * Get linens
     *
     * @return boolean 
     */
    public function getLinens()
    {
        return $this->linens;
    }

    /**
     * Set specialneeds
     *
     * @param integer $specialneeds
     * @return Attenders
     */
    public function setSpecialneeds($specialneeds)
    {
        $this->specialneeds = $specialneeds;

        return $this;
    }

    /**
     * Get specialneeds
     *
     * @return integer 
     */
    public function getSpecialneeds()
    {
        return $this->specialneeds;
    }

    /**
     * Set arrivaltime
     *
     * @param boolean $arrivaltime
     * @return Attenders
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
     * @return Attenders
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
     * Set housing
     *
     * @param integer $housing
     * @return Attenders
     */
    public function setHousing($housing)
    {
        $this->housing = $housing;

        return $this;
    }

    /**
     * Get housing
     *
     * @return integer 
     */
    public function getHousing()
    {
        return $this->housing;
    }

    /**
     * Set vegetarian
     *
     * @param boolean $vegetarian
     * @return Attenders
     */
    public function setVegetarian($vegetarian)
    {
        $this->vegetarian = $vegetarian;

        return $this;
    }

    /**
     * Get vegetarian
     *
     * @return boolean 
     */
    public function getVegetarian()
    {
        return $this->vegetarian;
    }

    /**
     * Set attended
     *
     * @param boolean $attended
     * @return Attenders
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
     * Set generation
     *
     * @param boolean $generation
     * @return Attenders
     */
    public function setGeneration($generation)
    {
        $this->generation = $generation;

        return $this;
    }

    /**
     * Get generation
     *
     * @return boolean 
     */
    public function getGeneration()
    {
        return $this->generation;
    }

    /**
     * Set gradelevel
     *
     * @param string $gradelevel
     * @return Attenders
     */
    public function setGradelevel($gradelevel)
    {
        $this->gradelevel = $gradelevel;

        return $this;
    }

    /**
     * Get gradelevel
     *
     * @return string 
     */
    public function getGradelevel()
    {
        return $this->gradelevel;
    }

    /**
     * Set agegroup
     *
     * @param integer $agegroup
     * @return Attenders
     */
    public function setAgegroup($agegroup)
    {
        $this->agegroup = $agegroup;

        return $this;
    }

    /**
     * Get agegroup
     *
     * @return integer 
     */
    public function getAgegroup()
    {
        return $this->agegroup;
    }

    /**
     * Set feecredit
     *
     * @param integer $feecredit
     * @return Attenders
     */
    public function setFeecredit($feecredit)
    {
        $this->feecredit = $feecredit;

        return $this;
    }

    /**
     * Get feecredit
     *
     * @return integer 
     */
    public function getFeecredit()
    {
        return $this->feecredit;
    }

    /**
     * Set singleoccupant
     *
     * @param boolean $singleoccupant
     * @return Attenders
     */
    public function setSingleoccupant($singleoccupant)
    {
        $this->singleoccupant = $singleoccupant;

        return $this;
    }

    /**
     * Get singleoccupant
     *
     * @return boolean 
     */
    public function getSingleoccupant()
    {
        return $this->singleoccupant;
    }
}

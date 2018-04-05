<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Persons
 *
 * @Table(name="persons", indexes={@Index(name="PersonNames", columns={"lastName", "firstName"}), @Index(name="person_address", columns={"addressID"})})
 * @Entity
 */
class Persons
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
    private $username;

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
     * @var integer
     *
     * @Column(name="membershipTypeId", type="integer", nullable=true)
     */
    private $membershiptypeid;

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
    private $directorylistingtypeid = '1';

    /**
     * @var \DateTime
     *
     * @Column(name="dateOfBirth", type="date", nullable=true)
     */
    private $dateofbirth;

    /**
     * @var boolean
     *
     * @Column(name="deceased", type="boolean", nullable=false)
     */
    private $deceased = '0';

    /**
     * @var string
     *
     * @Column(name="organization", type="string", length=100, nullable=true)
     */
    private $organization;

    /**
     * @var \DateTime
     *
     * @Column(name="dateAdded", type="datetime", nullable=true)
     */
    private $dateadded;

    /**
     * @var string
     *
     * @Column(name="addedBy", type="string", length=100, nullable=true)
     */
    private $addedby;

    /**
     * @var \DateTime
     *
     * @Column(name="dateUpdated", type="datetime", nullable=true)
     */
    private $dateupdated;

    /**
     * @var string
     *
     * @Column(name="updatedBy", type="string", length=100, nullable=true)
     */
    private $updatedby;

    /**
     * @var \Addresses
     *
     * @ManyToOne(targetEntity="Addresses")
     * @JoinColumns({
     *   @JoinColumn(name="addressID", referencedColumnName="addressID")
     * })
     */
    private $addressid;


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
     * @return Persons
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
     * @return Persons
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
     * @return Persons
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
     * @return Persons
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
     * Set phone
     *
     * @param string $phone
     * @return Persons
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
     * @return Persons
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
     * @return Persons
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
     * Set notes
     *
     * @param string $notes
     * @return Persons
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
     * @return Persons
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
     * @return Persons
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
     * @return Persons
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
     * @return Persons
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
     * Set membershiptypeid
     *
     * @param integer $membershiptypeid
     * @return Persons
     */
    public function setMembershiptypeid($membershiptypeid)
    {
        $this->membershiptypeid = $membershiptypeid;

        return $this;
    }

    /**
     * Get membershiptypeid
     *
     * @return integer 
     */
    public function getMembershiptypeid()
    {
        return $this->membershiptypeid;
    }

    /**
     * Set otheraffiliation
     *
     * @param string $otheraffiliation
     * @return Persons
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
     * Set directorylistingtypeid
     *
     * @param integer $directorylistingtypeid
     * @return Persons
     */
    public function setDirectorylistingtypeid($directorylistingtypeid)
    {
        $this->directorylistingtypeid = $directorylistingtypeid;

        return $this;
    }

    /**
     * Get directorylistingtypeid
     *
     * @return integer 
     */
    public function getDirectorylistingtypeid()
    {
        return $this->directorylistingtypeid;
    }

    /**
     * Set dateofbirth
     *
     * @param \DateTime $dateofbirth
     * @return Persons
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
     * Set deceased
     *
     * @param boolean $deceased
     * @return Persons
     */
    public function setDeceased($deceased)
    {
        $this->deceased = $deceased;

        return $this;
    }

    /**
     * Get deceased
     *
     * @return boolean 
     */
    public function getDeceased()
    {
        return $this->deceased;
    }

    /**
     * Set organization
     *
     * @param string $organization
     * @return Persons
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
     * Set dateadded
     *
     * @param \DateTime $dateadded
     * @return Persons
     */
    public function setDateadded($dateadded)
    {
        $this->dateadded = $dateadded;

        return $this;
    }

    /**
     * Get dateadded
     *
     * @return \DateTime 
     */
    public function getDateadded()
    {
        return $this->dateadded;
    }

    /**
     * Set addedby
     *
     * @param string $addedby
     * @return Persons
     */
    public function setAddedby($addedby)
    {
        $this->addedby = $addedby;

        return $this;
    }

    /**
     * Get addedby
     *
     * @return string 
     */
    public function getAddedby()
    {
        return $this->addedby;
    }

    /**
     * Set dateupdated
     *
     * @param \DateTime $dateupdated
     * @return Persons
     */
    public function setDateupdated($dateupdated)
    {
        $this->dateupdated = $dateupdated;

        return $this;
    }

    /**
     * Get dateupdated
     *
     * @return \DateTime 
     */
    public function getDateupdated()
    {
        return $this->dateupdated;
    }

    /**
     * Set updatedby
     *
     * @param string $updatedby
     * @return Persons
     */
    public function setUpdatedby($updatedby)
    {
        $this->updatedby = $updatedby;

        return $this;
    }

    /**
     * Get updatedby
     *
     * @return string 
     */
    public function getUpdatedby()
    {
        return $this->updatedby;
    }

    /**
     * Set addressid
     *
     * @param \Addresses $addressid
     * @return Persons
     */
    public function setAddressid(\Addresses $addressid = null)
    {
        $this->addressid = $addressid;

        return $this;
    }

    /**
     * Get addressid
     *
     * @return \Addresses 
     */
    public function getAddressid()
    {
        return $this->addressid;
    }
}

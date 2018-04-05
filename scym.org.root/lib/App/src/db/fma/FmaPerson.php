<?php

namespace App\db\fma;

use Doctrine\ORM\Mapping as ORM;

/**
 * Persons
 *
 * @Table(name="persons", indexes={@Index(name="PersonNames", columns={"lastName", "firstName"})})
 * @Entity
 */
class FmaPerson
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
     * @var integer
     *
     * @Column(name="addressID", type="integer", nullable=true)
     */
    private $addressid;

    /**
     * @var string
     *
     * @Column(name="phone", type="string", length=25, nullable=true)
     */
    private $phone;

    /**
     * @var string
     *
     * @Column(name="workPhone", type="string", length=25, nullable=true)
     */
    private $workphone;

    /**
     * @var string
     *
     * @Column(name="email", type="string", length=50, nullable=true)
     */
    private $email;

    /**
     * @var integer
     *
     * @Column(name="membershipStatus", type="integer", nullable=true)
     */
    private $membershipstatus = '1';

    /**
     * @var integer
     *
     * @Column(name="birthYear", type="integer", nullable=true)
     */
    private $birthyear = '0';

    /**
     * @var string
     *
     * @Column(name="username", type="string", length=30, nullable=true)
     */
    private $username;

    /**
     * @var string
     *
     * @Column(name="password", type="string", length=30, nullable=true)
     */
    private $password;

    /**
     * @var string
     *
     * @Column(name="notes", type="string", length=200, nullable=true)
     */
    private $notes;

    /**
     * @var \DateTime
     *
     * @Column(name="dateAdded", type="date", nullable=true)
     */
    private $dateadded;

    /**
     * @var \DateTime
     *
     * @Column(name="dateUpdated", type="date", nullable=true)
     */
    private $dateupdated;

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
     * @var \DateTime
     *
     * @Column(name="dateOfBirth", type="date", nullable=true)
     */
    private $dateofbirth;

    /**
     * @var \DateTime
     *
     * @Column(name="deceased", type="date", nullable=true)
     */
    private $deceased;

    /**
     * @var integer
     *
     * @Column(name="directoryCode", type="integer", nullable=true)
     */
    private $directorycode = '1';

    /**
     * @var string
     *
     * @Column(name="otherAffiliation", type="string", length=50, nullable=true)
     */
    private $otheraffiliation;

    /**
     * @var string
     *
     * @Column(name="residenceLocation", type="string", length=50, nullable=true)
     */
    private $residencelocation;

    /**
     * @var string
     *
     * @Column(name="createdBy", type="string", length=30, nullable=true)
     */
    private $createdby;

    /**
     * @var string
     *
     * @Column(name="updatedBy", type="string", length=30, nullable=true)
     */
    private $updatedby;


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
     * @return FmaPerson
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
     * @return FmaPerson
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
     * @return FmaPerson
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
     * Set addressid
     *
     * @param integer $addressid
     * @return FmaPerson
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
     * Set phone
     *
     * @param string $phone
     * @return FmaPerson
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
     * Set workphone
     *
     * @param string $workphone
     * @return FmaPerson
     */
    public function setWorkphone($workphone)
    {
        $this->workphone = $workphone;
    
        return $this;
    }

    /**
     * Get workphone
     *
     * @return string 
     */
    public function getWorkphone()
    {
        return $this->workphone;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return FmaPerson
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
     * Set membershipstatus
     *
     * @param integer $membershipstatus
     * @return FmaPerson
     */
    public function setMembershipstatus($membershipstatus)
    {
        $this->membershipstatus = $membershipstatus;
    
        return $this;
    }

    /**
     * Get membershipstatus
     *
     * @return integer 
     */
    public function getMembershipstatus()
    {
        return $this->membershipstatus;
    }

    /**
     * Set birthyear
     *
     * @param integer $birthyear
     * @return FmaPerson
     */
    public function setBirthyear($birthyear)
    {
        $this->birthyear = $birthyear;
    
        return $this;
    }

    /**
     * Get birthyear
     *
     * @return integer 
     */
    public function getBirthyear()
    {
        return $this->birthyear;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return FmaPerson
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
     * Set password
     *
     * @param string $password
     * @return FmaPerson
     */
    public function setPassword($password)
    {
        $this->password = $password;
    
        return $this;
    }

    /**
     * Get password
     *
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set notes
     *
     * @param string $notes
     * @return FmaPerson
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
     * Set dateadded
     *
     * @param \DateTime $dateadded
     * @return FmaPerson
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
     * Set dateupdated
     *
     * @param \DateTime $dateupdated
     * @return FmaPerson
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
     * Set junior
     *
     * @param boolean $junior
     * @return FmaPerson
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
     * @return FmaPerson
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
     * @return FmaPerson
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
     * Set dateofbirth
     *
     * @param \DateTime $dateofbirth
     * @return FmaPerson
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
     * @param \DateTime $deceased
     * @return FmaPerson
     */
    public function setDeceased($deceased)
    {
        $this->deceased = $deceased;
    
        return $this;
    }

    /**
     * Get deceased
     *
     * @return \DateTime 
     */
    public function getDeceased()
    {
        return $this->deceased;
    }

    /**
     * Set directorycode
     *
     * @param integer $directorycode
     * @return FmaPerson
     */
    public function setDirectorycode($directorycode)
    {
        $this->directorycode = $directorycode;
    
        return $this;
    }

    /**
     * Get directorycode
     *
     * @return integer 
     */
    public function getDirectorycode()
    {
        return $this->directorycode;
    }

    /**
     * Set otheraffiliation
     *
     * @param string $otheraffiliation
     * @return FmaPerson
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
     * Set residencelocation
     *
     * @param string $residencelocation
     * @return FmaPerson
     */
    public function setResidencelocation($residencelocation)
    {
        $this->residencelocation = $residencelocation;
    
        return $this;
    }

    /**
     * Get residencelocation
     *
     * @return string 
     */
    public function getResidencelocation()
    {
        return $this->residencelocation;
    }

    /**
     * Set createdby
     *
     * @param string $createdby
     * @return FmaPerson
     */
    public function setCreatedby($createdby)
    {
        $this->createdby = $createdby;
    
        return $this;
    }

    /**
     * Get createdby
     *
     * @return string 
     */
    public function getCreatedby()
    {
        return $this->createdby;
    }

    /**
     * Set updatedby
     *
     * @param string $updatedby
     * @return FmaPerson
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
}

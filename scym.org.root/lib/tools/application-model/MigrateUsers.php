<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * MigrateUsers
 *
 * @Table(name="migrate_users")
 * @Entity
 */
class MigrateUsers
{
    /**
     * @var integer
     *
     * @Column(name="migrateId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $migrateid;

    /**
     * @var integer
     *
     * @Column(name="personId", type="integer", nullable=true)
     */
    private $personid;

    /**
     * @var integer
     *
     * @Column(name="userId", type="integer", nullable=false)
     */
    private $userid;

    /**
     * @var string
     *
     * @Column(name="username", type="string", length=50, nullable=false)
     */
    private $username;

    /**
     * @var string
     *
     * @Column(name="password", type="string", length=50, nullable=true)
     */
    private $password;

    /**
     * @var string
     *
     * @Column(name="email", type="string", length=80, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @Column(name="firstName", type="string", length=50, nullable=true)
     */
    private $firstname = '';

    /**
     * @var string
     *
     * @Column(name="middleName", type="string", length=50, nullable=true)
     */
    private $middlename = '';

    /**
     * @var string
     *
     * @Column(name="lastName", type="string", length=50, nullable=true)
     */
    private $lastname = '';

    /**
     * @var string
     *
     * @Column(name="meeting", type="string", length=100, nullable=true)
     */
    private $meeting;

    /**
     * @var boolean
     *
     * @Column(name="duplicate", type="boolean", nullable=true)
     */
    private $duplicate;

    /**
     * @var string
     *
     * @Column(name="shared", type="blob", length=1, nullable=true)
     */
    private $shared;


    /**
     * Get migrateid
     *
     * @return integer 
     */
    public function getMigrateid()
    {
        return $this->migrateid;
    }

    /**
     * Set personid
     *
     * @param integer $personid
     * @return MigrateUsers
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
     * Set userid
     *
     * @param integer $userid
     * @return MigrateUsers
     */
    public function setUserid($userid)
    {
        $this->userid = $userid;

        return $this;
    }

    /**
     * Get userid
     *
     * @return integer 
     */
    public function getUserid()
    {
        return $this->userid;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return MigrateUsers
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
     * @return MigrateUsers
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
     * Set email
     *
     * @param string $email
     * @return MigrateUsers
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
     * Set firstname
     *
     * @param string $firstname
     * @return MigrateUsers
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
     * Set middlename
     *
     * @param string $middlename
     * @return MigrateUsers
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
     * Set lastname
     *
     * @param string $lastname
     * @return MigrateUsers
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
     * Set meeting
     *
     * @param string $meeting
     * @return MigrateUsers
     */
    public function setMeeting($meeting)
    {
        $this->meeting = $meeting;

        return $this;
    }

    /**
     * Get meeting
     *
     * @return string 
     */
    public function getMeeting()
    {
        return $this->meeting;
    }

    /**
     * Set duplicate
     *
     * @param boolean $duplicate
     * @return MigrateUsers
     */
    public function setDuplicate($duplicate)
    {
        $this->duplicate = $duplicate;

        return $this;
    }

    /**
     * Get duplicate
     *
     * @return boolean 
     */
    public function getDuplicate()
    {
        return $this->duplicate;
    }

    /**
     * Set shared
     *
     * @param string $shared
     * @return MigrateUsers
     */
    public function setShared($shared)
    {
        $this->shared = $shared;

        return $this;
    }

    /**
     * Get shared
     *
     * @return string 
     */
    public function getShared()
    {
        return $this->shared;
    }
}

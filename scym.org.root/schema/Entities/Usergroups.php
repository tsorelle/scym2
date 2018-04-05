<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Usergroups
 *
 * @Table(name="usergroups")
 * @Entity
 */
class Usergroups
{
    /**
     * @var integer
     *
     * @Column(name="usergroupId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $usergroupid;

    /**
     * @var string
     *
     * @Column(name="username", type="string", length=50, nullable=true)
     */
    private $username;

    /**
     * @var integer
     *
     * @Column(name="groupId", type="integer", nullable=true)
     */
    private $groupid;


    /**
     * Get usergroupid
     *
     * @return integer 
     */
    public function getUsergroupid()
    {
        return $this->usergroupid;
    }

    /**
     * Set username
     *
     * @param string $username
     * @return Usergroups
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
     * Set groupid
     *
     * @param integer $groupid
     * @return Usergroups
     */
    public function setGroupid($groupid)
    {
        $this->groupid = $groupid;

        return $this;
    }

    /**
     * Get groupid
     *
     * @return integer 
     */
    public function getGroupid()
    {
        return $this->groupid;
    }
}

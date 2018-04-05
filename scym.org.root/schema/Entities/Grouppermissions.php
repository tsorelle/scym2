<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Grouppermissions
 *
 * @Table(name="grouppermissions")
 * @Entity
 */
class Grouppermissions
{
    /**
     * @var integer
     *
     * @Column(name="groupPermissionId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $grouppermissionid;

    /**
     * @var integer
     *
     * @Column(name="permissionId", type="integer", nullable=false)
     */
    private $permissionid;

    /**
     * @var integer
     *
     * @Column(name="groupId", type="integer", nullable=false)
     */
    private $groupid;


    /**
     * Get grouppermissionid
     *
     * @return integer 
     */
    public function getGrouppermissionid()
    {
        return $this->grouppermissionid;
    }

    /**
     * Set permissionid
     *
     * @param integer $permissionid
     * @return Grouppermissions
     */
    public function setPermissionid($permissionid)
    {
        $this->permissionid = $permissionid;

        return $this;
    }

    /**
     * Get permissionid
     *
     * @return integer 
     */
    public function getPermissionid()
    {
        return $this->permissionid;
    }

    /**
     * Set groupid
     *
     * @param integer $groupid
     * @return Grouppermissions
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

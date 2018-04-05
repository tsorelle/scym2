<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Membershiptypes
 *
 * @Table(name="membershiptypes")
 * @Entity
 */
class Membershiptypes
{
    /**
     * @var integer
     *
     * @Column(name="membershipTypeId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $membershiptypeid = '0';

    /**
     * @var string
     *
     * @Column(name="membershipTypeName", type="string", length=40, nullable=true)
     */
    private $membershiptypename;

    /**
     * @var boolean
     *
     * @Column(name="active", type="boolean", nullable=false)
     */
    private $active = '1';


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
     * Set membershiptypename
     *
     * @param string $membershiptypename
     * @return Membershiptypes
     */
    public function setMembershiptypename($membershiptypename)
    {
        $this->membershiptypename = $membershiptypename;

        return $this;
    }

    /**
     * Get membershiptypename
     *
     * @return string 
     */
    public function getMembershiptypename()
    {
        return $this->membershiptypename;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return Membershiptypes
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
}

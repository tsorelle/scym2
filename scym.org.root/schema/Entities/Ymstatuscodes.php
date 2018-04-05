<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Ymstatuscodes
 *
 * @Table(name="ymstatuscodes")
 * @Entity
 */
class Ymstatuscodes
{
    /**
     * @var integer
     *
     * @Column(name="ymStatusCodeId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $ymstatuscodeid = '0';

    /**
     * @var string
     *
     * @Column(name="status", type="string", length=40, nullable=true)
     */
    private $status;


    /**
     * Get ymstatuscodeid
     *
     * @return integer 
     */
    public function getYmstatuscodeid()
    {
        return $this->ymstatuscodeid;
    }

    /**
     * Set status
     *
     * @param string $status
     * @return Ymstatuscodes
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return string 
     */
    public function getStatus()
    {
        return $this->status;
    }
}

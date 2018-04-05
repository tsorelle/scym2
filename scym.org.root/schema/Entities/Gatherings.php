<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Gatherings
 *
 * @Table(name="gatherings")
 * @Entity
 */
class Gatherings
{
    /**
     * @var integer
     *
     * @Column(name="gatheringID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $gatheringid;

    /**
     * @var string
     *
     * @Column(name="gatheringName", type="string", length=50, nullable=false)
     */
    private $gatheringname = '';

    /**
     * @var \DateTime
     *
     * @Column(name="gatheringStartDate", type="date", nullable=false)
     */
    private $gatheringstartdate = '0000-00-00';

    /**
     * @var \DateTime
     *
     * @Column(name="gatheringEndDate", type="date", nullable=true)
     */
    private $gatheringenddate;


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
     * Set gatheringname
     *
     * @param string $gatheringname
     * @return Gatherings
     */
    public function setGatheringname($gatheringname)
    {
        $this->gatheringname = $gatheringname;

        return $this;
    }

    /**
     * Get gatheringname
     *
     * @return string 
     */
    public function getGatheringname()
    {
        return $this->gatheringname;
    }

    /**
     * Set gatheringstartdate
     *
     * @param \DateTime $gatheringstartdate
     * @return Gatherings
     */
    public function setGatheringstartdate($gatheringstartdate)
    {
        $this->gatheringstartdate = $gatheringstartdate;

        return $this;
    }

    /**
     * Get gatheringstartdate
     *
     * @return \DateTime 
     */
    public function getGatheringstartdate()
    {
        return $this->gatheringstartdate;
    }

    /**
     * Set gatheringenddate
     *
     * @param \DateTime $gatheringenddate
     * @return Gatherings
     */
    public function setGatheringenddate($gatheringenddate)
    {
        $this->gatheringenddate = $gatheringenddate;

        return $this;
    }

    /**
     * Get gatheringenddate
     *
     * @return \DateTime 
     */
    public function getGatheringenddate()
    {
        return $this->gatheringenddate;
    }
}

<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Ymdates
 *
 * @Table(name="ymdates")
 * @Entity
 */
class Ymdates
{
    /**
     * @var string
     *
     * @Column(name="year", type="string", length=4, nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $year;

    /**
     * @var \DateTime
     *
     * @Column(name="start", type="date", nullable=true)
     */
    private $start;

    /**
     * @var \DateTime
     *
     * @Column(name="end", type="date", nullable=true)
     */
    private $end;


    /**
     * Get year
     *
     * @return string 
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Set start
     *
     * @param \DateTime $start
     * @return Ymdates
     */
    public function setStart($start)
    {
        $this->start = $start;

        return $this;
    }

    /**
     * Get start
     *
     * @return \DateTime 
     */
    public function getStart()
    {
        return $this->start;
    }

    /**
     * Set end
     *
     * @param \DateTime $end
     * @return Ymdates
     */
    public function setEnd($end)
    {
        $this->end = $end;

        return $this;
    }

    /**
     * Get end
     *
     * @return \DateTime 
     */
    public function getEnd()
    {
        return $this->end;
    }
}

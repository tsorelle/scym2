<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Days
 *
 * @Table(name="days")
 * @Entity
 */
class Days
{
    /**
     * @var integer
     *
     * @Column(name="daynumber", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $daynumber = '0';

    /**
     * @var string
     *
     * @Column(name="dayname", type="string", length=10, nullable=true)
     */
    private $dayname;


    /**
     * Get daynumber
     *
     * @return integer 
     */
    public function getDaynumber()
    {
        return $this->daynumber;
    }

    /**
     * Set dayname
     *
     * @param string $dayname
     * @return Days
     */
    public function setDayname($dayname)
    {
        $this->dayname = $dayname;

        return $this;
    }

    /**
     * Get dayname
     *
     * @return string 
     */
    public function getDayname()
    {
        return $this->dayname;
    }
}

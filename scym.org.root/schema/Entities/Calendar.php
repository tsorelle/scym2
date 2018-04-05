<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Calendar
 *
 * @Table(name="calendar")
 * @Entity
 */
class Calendar
{
    /**
     * @var integer
     *
     * @Column(name="calendarId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $calendarid;

    /**
     * @var string
     *
     * @Column(name="title", type="string", length=100, nullable=false)
     */
    private $title = '';

    /**
     * @var string
     *
     * @Column(name="bodyText", type="text", nullable=true)
     */
    private $bodytext;

    /**
     * @var \DateTime
     *
     * @Column(name="startDate", type="date", nullable=false)
     */
    private $startdate = '0000-00-00';

    /**
     * @var \DateTime
     *
     * @Column(name="endDate", type="date", nullable=true)
     */
    private $enddate;

    /**
     * @var integer
     *
     * @Column(name="postedBy", type="integer", nullable=true)
     */
    private $postedby;

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
     * Get calendarid
     *
     * @return integer 
     */
    public function getCalendarid()
    {
        return $this->calendarid;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return Calendar
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set bodytext
     *
     * @param string $bodytext
     * @return Calendar
     */
    public function setBodytext($bodytext)
    {
        $this->bodytext = $bodytext;

        return $this;
    }

    /**
     * Get bodytext
     *
     * @return string 
     */
    public function getBodytext()
    {
        return $this->bodytext;
    }

    /**
     * Set startdate
     *
     * @param \DateTime $startdate
     * @return Calendar
     */
    public function setStartdate($startdate)
    {
        $this->startdate = $startdate;

        return $this;
    }

    /**
     * Get startdate
     *
     * @return \DateTime 
     */
    public function getStartdate()
    {
        return $this->startdate;
    }

    /**
     * Set enddate
     *
     * @param \DateTime $enddate
     * @return Calendar
     */
    public function setEnddate($enddate)
    {
        $this->enddate = $enddate;

        return $this;
    }

    /**
     * Get enddate
     *
     * @return \DateTime 
     */
    public function getEnddate()
    {
        return $this->enddate;
    }

    /**
     * Set postedby
     *
     * @param integer $postedby
     * @return Calendar
     */
    public function setPostedby($postedby)
    {
        $this->postedby = $postedby;

        return $this;
    }

    /**
     * Get postedby
     *
     * @return integer 
     */
    public function getPostedby()
    {
        return $this->postedby;
    }

    /**
     * Set dateadded
     *
     * @param \DateTime $dateadded
     * @return Calendar
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
     * @return Calendar
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
}

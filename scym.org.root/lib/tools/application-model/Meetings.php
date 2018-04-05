<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Meetings
 *
 * @Table(name="meetings", uniqueConstraints={@UniqueConstraint(name="affiliationCodeIndex", columns={"affiliationCode"})}, indexes={@Index(name="fk_quarterlyMeetingId", columns={"quarterlyMeetingId"})})
 * @Entity
 */
class Meetings
{
    /**
     * @var integer
     *
     * @Column(name="meetingId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $meetingid;

    /**
     * @var string
     *
     * @Column(name="meetingName", type="string", length=100, nullable=true)
     */
    private $meetingname;

    /**
     * @var string
     *
     * @Column(name="state", type="string", length=30, nullable=true)
     */
    private $state;

    /**
     * @var string
     *
     * @Column(name="area", type="string", length=30, nullable=true)
     */
    private $area;

    /**
     * @var string
     *
     * @Column(name="affiliationCode", type="string", length=20, nullable=true)
     */
    private $affiliationcode = '';

    /**
     * @var string
     *
     * @Column(name="worshipTimes", type="string", length=100, nullable=true)
     */
    private $worshiptimes;

    /**
     * @var string
     *
     * @Column(name="worshipLocation", type="string", length=255, nullable=true)
     */
    private $worshiplocation;

    /**
     * @var string
     *
     * @Column(name="url", type="string", length=100, nullable=true)
     */
    private $url;

    /**
     * @var string
     *
     * @Column(name="detailText", type="text", nullable=true)
     */
    private $detailtext;

    /**
     * @var string
     *
     * @Column(name="note", type="string", length=128, nullable=true)
     */
    private $note;

    /**
     * @var integer
     *
     * @Column(name="latitude", type="integer", nullable=true)
     */
    private $latitude;

    /**
     * @var integer
     *
     * @Column(name="longitude", type="integer", nullable=true)
     */
    private $longitude;

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
     * @Column(name="active", type="boolean", nullable=true)
     */
    private $active = '1';

    /**
     * @var string
     *
     * @Column(name="addedBy", type="string", length=100, nullable=true)
     */
    private $addedby;

    /**
     * @var string
     *
     * @Column(name="updatedBy", type="string", length=100, nullable=true)
     */
    private $updatedby;

    /**
     * @var \Quarterlymeetings
     *
     * @ManyToOne(targetEntity="Quarterlymeetings")
     * @JoinColumns({
     *   @JoinColumn(name="quarterlyMeetingId", referencedColumnName="quarterlyMeetingId")
     * })
     */
    private $quarterlymeetingid;


    /**
     * Get meetingid
     *
     * @return integer 
     */
    public function getMeetingid()
    {
        return $this->meetingid;
    }

    /**
     * Set meetingname
     *
     * @param string $meetingname
     * @return Meetings
     */
    public function setMeetingname($meetingname)
    {
        $this->meetingname = $meetingname;

        return $this;
    }

    /**
     * Get meetingname
     *
     * @return string 
     */
    public function getMeetingname()
    {
        return $this->meetingname;
    }

    /**
     * Set state
     *
     * @param string $state
     * @return Meetings
     */
    public function setState($state)
    {
        $this->state = $state;

        return $this;
    }

    /**
     * Get state
     *
     * @return string 
     */
    public function getState()
    {
        return $this->state;
    }

    /**
     * Set area
     *
     * @param string $area
     * @return Meetings
     */
    public function setArea($area)
    {
        $this->area = $area;

        return $this;
    }

    /**
     * Get area
     *
     * @return string 
     */
    public function getArea()
    {
        return $this->area;
    }

    /**
     * Set affiliationcode
     *
     * @param string $affiliationcode
     * @return Meetings
     */
    public function setAffiliationcode($affiliationcode)
    {
        $this->affiliationcode = $affiliationcode;

        return $this;
    }

    /**
     * Get affiliationcode
     *
     * @return string 
     */
    public function getAffiliationcode()
    {
        return $this->affiliationcode;
    }

    /**
     * Set worshiptimes
     *
     * @param string $worshiptimes
     * @return Meetings
     */
    public function setWorshiptimes($worshiptimes)
    {
        $this->worshiptimes = $worshiptimes;

        return $this;
    }

    /**
     * Get worshiptimes
     *
     * @return string 
     */
    public function getWorshiptimes()
    {
        return $this->worshiptimes;
    }

    /**
     * Set worshiplocation
     *
     * @param string $worshiplocation
     * @return Meetings
     */
    public function setWorshiplocation($worshiplocation)
    {
        $this->worshiplocation = $worshiplocation;

        return $this;
    }

    /**
     * Get worshiplocation
     *
     * @return string 
     */
    public function getWorshiplocation()
    {
        return $this->worshiplocation;
    }

    /**
     * Set url
     *
     * @param string $url
     * @return Meetings
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string 
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set detailtext
     *
     * @param string $detailtext
     * @return Meetings
     */
    public function setDetailtext($detailtext)
    {
        $this->detailtext = $detailtext;

        return $this;
    }

    /**
     * Get detailtext
     *
     * @return string 
     */
    public function getDetailtext()
    {
        return $this->detailtext;
    }

    /**
     * Set note
     *
     * @param string $note
     * @return Meetings
     */
    public function setNote($note)
    {
        $this->note = $note;

        return $this;
    }

    /**
     * Get note
     *
     * @return string 
     */
    public function getNote()
    {
        return $this->note;
    }

    /**
     * Set latitude
     *
     * @param integer $latitude
     * @return Meetings
     */
    public function setLatitude($latitude)
    {
        $this->latitude = $latitude;

        return $this;
    }

    /**
     * Get latitude
     *
     * @return integer 
     */
    public function getLatitude()
    {
        return $this->latitude;
    }

    /**
     * Set longitude
     *
     * @param integer $longitude
     * @return Meetings
     */
    public function setLongitude($longitude)
    {
        $this->longitude = $longitude;

        return $this;
    }

    /**
     * Get longitude
     *
     * @return integer 
     */
    public function getLongitude()
    {
        return $this->longitude;
    }

    /**
     * Set dateadded
     *
     * @param \DateTime $dateadded
     * @return Meetings
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
     * @return Meetings
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
     * Set active
     *
     * @param boolean $active
     * @return Meetings
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
     * Set addedby
     *
     * @param string $addedby
     * @return Meetings
     */
    public function setAddedby($addedby)
    {
        $this->addedby = $addedby;

        return $this;
    }

    /**
     * Get addedby
     *
     * @return string 
     */
    public function getAddedby()
    {
        return $this->addedby;
    }

    /**
     * Set updatedby
     *
     * @param string $updatedby
     * @return Meetings
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

    /**
     * Set quarterlymeetingid
     *
     * @param \Quarterlymeetings $quarterlymeetingid
     * @return Meetings
     */
    public function setQuarterlymeetingid(\Quarterlymeetings $quarterlymeetingid = null)
    {
        $this->quarterlymeetingid = $quarterlymeetingid;

        return $this;
    }

    /**
     * Get quarterlymeetingid
     *
     * @return \Quarterlymeetings 
     */
    public function getQuarterlymeetingid()
    {
        return $this->quarterlymeetingid;
    }
}

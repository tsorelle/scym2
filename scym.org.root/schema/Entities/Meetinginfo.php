<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Meetinginfo
 *
 * @Table(name="meetinginfo")
 * @Entity
 */
class Meetinginfo
{
    /**
     * @var integer
     *
     * @Column(name="meetingInfoID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $meetinginfoid;

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
     * Get meetinginfoid
     *
     * @return integer 
     */
    public function getMeetinginfoid()
    {
        return $this->meetinginfoid;
    }

    /**
     * Set meetingname
     *
     * @param string $meetingname
     * @return Meetinginfo
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
     * @return Meetinginfo
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
     * @return Meetinginfo
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
     * @return Meetinginfo
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
     * @return Meetinginfo
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
     * @return Meetinginfo
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
     * @return Meetinginfo
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
     * @return Meetinginfo
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
     * @return Meetinginfo
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
}

<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Quarterlymeetings
 *
 * @Table(name="quarterlymeetings")
 * @Entity
 */
class Quarterlymeetings
{
    /**
     * @var integer
     *
     * @Column(name="quarterlyMeetingId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $quarterlymeetingid;

    /**
     * @var string
     *
     * @Column(name="quarterlyMeetingName", type="string", length=50, nullable=true)
     */
    private $quarterlymeetingname;

    /**
     * @var string
     *
     * @Column(name="description", type="text", nullable=true)
     */
    private $description;

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
     * Get quarterlymeetingid
     *
     * @return integer 
     */
    public function getQuarterlymeetingid()
    {
        return $this->quarterlymeetingid;
    }

    /**
     * Set quarterlymeetingname
     *
     * @param string $quarterlymeetingname
     * @return Quarterlymeetings
     */
    public function setQuarterlymeetingname($quarterlymeetingname)
    {
        $this->quarterlymeetingname = $quarterlymeetingname;

        return $this;
    }

    /**
     * Get quarterlymeetingname
     *
     * @return string 
     */
    public function getQuarterlymeetingname()
    {
        return $this->quarterlymeetingname;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Quarterlymeetings
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set dateadded
     *
     * @param \DateTime $dateadded
     * @return Quarterlymeetings
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
     * @return Quarterlymeetings
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
     * @return Quarterlymeetings
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
     * @return Quarterlymeetings
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
     * @return Quarterlymeetings
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
}

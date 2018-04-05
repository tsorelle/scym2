<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Housingassignments
 *
 * @Table(name="housingassignments", uniqueConstraints={@UniqueConstraint(name="personDay", columns={"attenderId", "day"})})
 * @Entity
 */
class Housingassignments
{
    /**
     * @var integer
     *
     * @Column(name="housingAssignmentID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $housingassignmentid;

    /**
     * @var integer
     *
     * @Column(name="attenderId", type="integer", nullable=true)
     */
    private $attenderid;

    /**
     * @var integer
     *
     * @Column(name="day", type="integer", nullable=true)
     */
    private $day;

    /**
     * @var integer
     *
     * @Column(name="housingType", type="integer", nullable=true)
     */
    private $housingtype;

    /**
     * @var string
     *
     * @Column(name="unit", type="string", length=10, nullable=true)
     */
    private $unit;

    /**
     * @var string
     *
     * @Column(name="note", type="string", length=255, nullable=true)
     */
    private $note;

    /**
     * @var boolean
     *
     * @Column(name="confirmed", type="boolean", nullable=true)
     */
    private $confirmed = '0';


    /**
     * Get housingassignmentid
     *
     * @return integer 
     */
    public function getHousingassignmentid()
    {
        return $this->housingassignmentid;
    }

    /**
     * Set attenderid
     *
     * @param integer $attenderid
     * @return Housingassignments
     */
    public function setAttenderid($attenderid)
    {
        $this->attenderid = $attenderid;

        return $this;
    }

    /**
     * Get attenderid
     *
     * @return integer 
     */
    public function getAttenderid()
    {
        return $this->attenderid;
    }

    /**
     * Set day
     *
     * @param integer $day
     * @return Housingassignments
     */
    public function setDay($day)
    {
        $this->day = $day;

        return $this;
    }

    /**
     * Get day
     *
     * @return integer 
     */
    public function getDay()
    {
        return $this->day;
    }

    /**
     * Set housingtype
     *
     * @param integer $housingtype
     * @return Housingassignments
     */
    public function setHousingtype($housingtype)
    {
        $this->housingtype = $housingtype;

        return $this;
    }

    /**
     * Get housingtype
     *
     * @return integer 
     */
    public function getHousingtype()
    {
        return $this->housingtype;
    }

    /**
     * Set unit
     *
     * @param string $unit
     * @return Housingassignments
     */
    public function setUnit($unit)
    {
        $this->unit = $unit;

        return $this;
    }

    /**
     * Get unit
     *
     * @return string 
     */
    public function getUnit()
    {
        return $this->unit;
    }

    /**
     * Set note
     *
     * @param string $note
     * @return Housingassignments
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
     * Set confirmed
     *
     * @param boolean $confirmed
     * @return Housingassignments
     */
    public function setConfirmed($confirmed)
    {
        $this->confirmed = $confirmed;

        return $this;
    }

    /**
     * Get confirmed
     *
     * @return boolean 
     */
    public function getConfirmed()
    {
        return $this->confirmed;
    }
}

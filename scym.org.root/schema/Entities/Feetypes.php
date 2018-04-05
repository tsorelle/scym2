<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Feetypes
 *
 * @Table(name="feetypes")
 * @Entity
 */
class Feetypes
{
    /**
     * @var integer
     *
     * @Column(name="feeTypeID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $feetypeid = '0';

    /**
     * @var string
     *
     * @Column(name="feeCode", type="string", length=20, nullable=false)
     */
    private $feecode = '';

    /**
     * @var integer
     *
     * @Column(name="feeCatagoryId", type="integer", nullable=false)
     */
    private $feecatagoryid = '0';

    /**
     * @var string
     *
     * @Column(name="description", type="string", length=50, nullable=false)
     */
    private $description = '';

    /**
     * @var boolean
     *
     * @Column(name="isCredit", type="boolean", nullable=true)
     */
    private $iscredit = '0';

    /**
     * @var string
     *
     * @Column(name="unitAmount", type="decimal", precision=10, scale=2, nullable=false)
     */
    private $unitamount = '0.00';

    /**
     * @var string
     *
     * @Column(name="basis", type="string", length=100, nullable=true)
     */
    private $basis;

    /**
     * @var boolean
     *
     * @Column(name="canwaive", type="boolean", nullable=false)
     */
    private $canwaive = '1';


    /**
     * Get feetypeid
     *
     * @return integer 
     */
    public function getFeetypeid()
    {
        return $this->feetypeid;
    }

    /**
     * Set feecode
     *
     * @param string $feecode
     * @return Feetypes
     */
    public function setFeecode($feecode)
    {
        $this->feecode = $feecode;

        return $this;
    }

    /**
     * Get feecode
     *
     * @return string 
     */
    public function getFeecode()
    {
        return $this->feecode;
    }

    /**
     * Set feecatagoryid
     *
     * @param integer $feecatagoryid
     * @return Feetypes
     */
    public function setFeecatagoryid($feecatagoryid)
    {
        $this->feecatagoryid = $feecatagoryid;

        return $this;
    }

    /**
     * Get feecatagoryid
     *
     * @return integer 
     */
    public function getFeecatagoryid()
    {
        return $this->feecatagoryid;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Feetypes
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
     * Set iscredit
     *
     * @param boolean $iscredit
     * @return Feetypes
     */
    public function setIscredit($iscredit)
    {
        $this->iscredit = $iscredit;

        return $this;
    }

    /**
     * Get iscredit
     *
     * @return boolean 
     */
    public function getIscredit()
    {
        return $this->iscredit;
    }

    /**
     * Set unitamount
     *
     * @param string $unitamount
     * @return Feetypes
     */
    public function setUnitamount($unitamount)
    {
        $this->unitamount = $unitamount;

        return $this;
    }

    /**
     * Get unitamount
     *
     * @return string 
     */
    public function getUnitamount()
    {
        return $this->unitamount;
    }

    /**
     * Set basis
     *
     * @param string $basis
     * @return Feetypes
     */
    public function setBasis($basis)
    {
        $this->basis = $basis;

        return $this;
    }

    /**
     * Get basis
     *
     * @return string 
     */
    public function getBasis()
    {
        return $this->basis;
    }

    /**
     * Set canwaive
     *
     * @param boolean $canwaive
     * @return Feetypes
     */
    public function setCanwaive($canwaive)
    {
        $this->canwaive = $canwaive;

        return $this;
    }

    /**
     * Get canwaive
     *
     * @return boolean 
     */
    public function getCanwaive()
    {
        return $this->canwaive;
    }
}

<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Charges
 *
 * @Table(name="charges")
 * @Entity
 */
class Charges
{
    /**
     * @var integer
     *
     * @Column(name="chargeId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $chargeid;

    /**
     * @var integer
     *
     * @Column(name="registrationId", type="integer", nullable=false)
     */
    private $registrationid = '0';

    /**
     * @var integer
     *
     * @Column(name="feeTypeID", type="integer", nullable=false)
     */
    private $feetypeid = '0';

    /**
     * @var string
     *
     * @Column(name="basis", type="string", length=60, nullable=true)
     */
    private $basis;

    /**
     * @var string
     *
     * @Column(name="amount", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $amount;

    /**
     * @var string
     *
     * @Column(name="notes", type="string", length=100, nullable=true)
     */
    private $notes;


    /**
     * Get chargeid
     *
     * @return integer 
     */
    public function getChargeid()
    {
        return $this->chargeid;
    }

    /**
     * Set registrationid
     *
     * @param integer $registrationid
     * @return Charges
     */
    public function setRegistrationid($registrationid)
    {
        $this->registrationid = $registrationid;

        return $this;
    }

    /**
     * Get registrationid
     *
     * @return integer 
     */
    public function getRegistrationid()
    {
        return $this->registrationid;
    }

    /**
     * Set feetypeid
     *
     * @param integer $feetypeid
     * @return Charges
     */
    public function setFeetypeid($feetypeid)
    {
        $this->feetypeid = $feetypeid;

        return $this;
    }

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
     * Set basis
     *
     * @param string $basis
     * @return Charges
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
     * Set amount
     *
     * @param string $amount
     * @return Charges
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;

        return $this;
    }

    /**
     * Get amount
     *
     * @return string 
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * Set notes
     *
     * @param string $notes
     * @return Charges
     */
    public function setNotes($notes)
    {
        $this->notes = $notes;

        return $this;
    }

    /**
     * Get notes
     *
     * @return string 
     */
    public function getNotes()
    {
        return $this->notes;
    }
}

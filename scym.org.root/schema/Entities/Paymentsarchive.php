<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Paymentsarchive
 *
 * @Table(name="paymentsarchive")
 * @Entity
 */
class Paymentsarchive
{
    /**
     * @var integer
     *
     * @Column(name="year", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="NONE")
     */
    private $year = '0';

    /**
     * @var integer
     *
     * @Column(name="paymentId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="NONE")
     */
    private $paymentid = '0';

    /**
     * @var \DateTime
     *
     * @Column(name="dateReceived", type="date", nullable=false)
     */
    private $datereceived = '0000-00-00';

    /**
     * @var string
     *
     * @Column(name="amount", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $amount;

    /**
     * @var integer
     *
     * @Column(name="paymentType", type="integer", nullable=false)
     */
    private $paymenttype = '0';

    /**
     * @var string
     *
     * @Column(name="checkNumber", type="string", length=10, nullable=true)
     */
    private $checknumber;

    /**
     * @var string
     *
     * @Column(name="payor", type="string", length=80, nullable=true)
     */
    private $payor;

    /**
     * @var integer
     *
     * @Column(name="registrationId", type="integer", nullable=true)
     */
    private $registrationid;


    /**
     * Set year
     *
     * @param integer $year
     * @return Paymentsarchive
     */
    public function setYear($year)
    {
        $this->year = $year;

        return $this;
    }

    /**
     * Get year
     *
     * @return integer 
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Set paymentid
     *
     * @param integer $paymentid
     * @return Paymentsarchive
     */
    public function setPaymentid($paymentid)
    {
        $this->paymentid = $paymentid;

        return $this;
    }

    /**
     * Get paymentid
     *
     * @return integer 
     */
    public function getPaymentid()
    {
        return $this->paymentid;
    }

    /**
     * Set datereceived
     *
     * @param \DateTime $datereceived
     * @return Paymentsarchive
     */
    public function setDatereceived($datereceived)
    {
        $this->datereceived = $datereceived;

        return $this;
    }

    /**
     * Get datereceived
     *
     * @return \DateTime 
     */
    public function getDatereceived()
    {
        return $this->datereceived;
    }

    /**
     * Set amount
     *
     * @param string $amount
     * @return Paymentsarchive
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
     * Set paymenttype
     *
     * @param integer $paymenttype
     * @return Paymentsarchive
     */
    public function setPaymenttype($paymenttype)
    {
        $this->paymenttype = $paymenttype;

        return $this;
    }

    /**
     * Get paymenttype
     *
     * @return integer 
     */
    public function getPaymenttype()
    {
        return $this->paymenttype;
    }

    /**
     * Set checknumber
     *
     * @param string $checknumber
     * @return Paymentsarchive
     */
    public function setChecknumber($checknumber)
    {
        $this->checknumber = $checknumber;

        return $this;
    }

    /**
     * Get checknumber
     *
     * @return string 
     */
    public function getChecknumber()
    {
        return $this->checknumber;
    }

    /**
     * Set payor
     *
     * @param string $payor
     * @return Paymentsarchive
     */
    public function setPayor($payor)
    {
        $this->payor = $payor;

        return $this;
    }

    /**
     * Get payor
     *
     * @return string 
     */
    public function getPayor()
    {
        return $this->payor;
    }

    /**
     * Set registrationid
     *
     * @param integer $registrationid
     * @return Paymentsarchive
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
}

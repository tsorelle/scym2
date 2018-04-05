<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Refunds
 *
 * @Table(name="refunds")
 * @Entity
 */
class Refunds
{
    /**
     * @var integer
     *
     * @Column(name="feeTypeId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $feetypeid;

    /**
     * @var string
     *
     * @Column(name="amount", type="decimal", precision=10, scale=2, nullable=true)
     */
    private $amount;


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
     * Set amount
     *
     * @param string $amount
     * @return Refunds
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
}

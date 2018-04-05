<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Credits
 *
 * @Table(name="credits")
 * @Entity
 */
class Credits
{
    /**
     * @var integer
     *
     * @Column(name="creditId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $creditid;

    /**
     * @var integer
     *
     * @Column(name="registrationId", type="integer", nullable=false)
     */
    private $registrationid = '0';

    /**
     * @var string
     *
     * @Column(name="description", type="string", length=50, nullable=true)
     */
    private $description;

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
     * @var integer
     *
     * @Column(name="creditTypeId", type="integer", nullable=true)
     */
    private $credittypeid;


    /**
     * Get creditid
     *
     * @return integer 
     */
    public function getCreditid()
    {
        return $this->creditid;
    }

    /**
     * Set registrationid
     *
     * @param integer $registrationid
     * @return Credits
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
     * Set description
     *
     * @param string $description
     * @return Credits
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
     * Set amount
     *
     * @param string $amount
     * @return Credits
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
     * @return Credits
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

    /**
     * Set credittypeid
     *
     * @param integer $credittypeid
     * @return Credits
     */
    public function setCredittypeid($credittypeid)
    {
        $this->credittypeid = $credittypeid;

        return $this;
    }

    /**
     * Get credittypeid
     *
     * @return integer 
     */
    public function getCredittypeid()
    {
        return $this->credittypeid;
    }
}

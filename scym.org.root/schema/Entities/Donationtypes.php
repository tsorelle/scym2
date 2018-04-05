<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Donationtypes
 *
 * @Table(name="donationtypes")
 * @Entity
 */
class Donationtypes
{
    /**
     * @var integer
     *
     * @Column(name="donationTypeId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $donationtypeid = '0';

    /**
     * @var string
     *
     * @Column(name="donationTypeCode", type="string", length=10, nullable=true)
     */
    private $donationtypecode;

    /**
     * @var string
     *
     * @Column(name="description", type="string", length=80, nullable=true)
     */
    private $description;


    /**
     * Get donationtypeid
     *
     * @return integer 
     */
    public function getDonationtypeid()
    {
        return $this->donationtypeid;
    }

    /**
     * Set donationtypecode
     *
     * @param string $donationtypecode
     * @return Donationtypes
     */
    public function setDonationtypecode($donationtypecode)
    {
        $this->donationtypecode = $donationtypecode;

        return $this;
    }

    /**
     * Get donationtypecode
     *
     * @return string 
     */
    public function getDonationtypecode()
    {
        return $this->donationtypecode;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Donationtypes
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
}

<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Vrreturns
 *
 * @Table(name="vrreturns")
 * @Entity
 */
class Vrreturns
{
    /**
     * @var integer
     *
     * @Column(name="id", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @Column(name="email_address", type="string", length=200, nullable=true)
     */
    private $emailAddress;

    /**
     * @var string
     *
     * @Column(name="optin_status", type="string", length=50, nullable=true)
     */
    private $optinStatus;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set emailAddress
     *
     * @param string $emailAddress
     * @return Vrreturns
     */
    public function setEmailAddress($emailAddress)
    {
        $this->emailAddress = $emailAddress;

        return $this;
    }

    /**
     * Get emailAddress
     *
     * @return string 
     */
    public function getEmailAddress()
    {
        return $this->emailAddress;
    }

    /**
     * Set optinStatus
     *
     * @param string $optinStatus
     * @return Vrreturns
     */
    public function setOptinStatus($optinStatus)
    {
        $this->optinStatus = $optinStatus;

        return $this;
    }

    /**
     * Get optinStatus
     *
     * @return string 
     */
    public function getOptinStatus()
    {
        return $this->optinStatus;
    }
}

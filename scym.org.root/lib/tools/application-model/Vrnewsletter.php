<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Vrnewsletter
 *
 * @Table(name="vrnewsletter")
 * @Entity
 */
class Vrnewsletter
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
     * @Column(name="optin_status", type="string", length=20, nullable=true)
     */
    private $optinStatus;

    /**
     * @var string
     *
     * @Column(name="optin_status_last_updated", type="string", length=25, nullable=true)
     */
    private $optinStatusLastUpdated;


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
     * @return Vrnewsletter
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
     * @return Vrnewsletter
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

    /**
     * Set optinStatusLastUpdated
     *
     * @param string $optinStatusLastUpdated
     * @return Vrnewsletter
     */
    public function setOptinStatusLastUpdated($optinStatusLastUpdated)
    {
        $this->optinStatusLastUpdated = $optinStatusLastUpdated;

        return $this;
    }

    /**
     * Get optinStatusLastUpdated
     *
     * @return string 
     */
    public function getOptinStatusLastUpdated()
    {
        return $this->optinStatusLastUpdated;
    }
}

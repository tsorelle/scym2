<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Vrbounces
 *
 * @Table(name="vrbounces")
 * @Entity
 */
class Vrbounces
{
    /**
     * @var integer
     *
     * @Column(name="bounceId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $bounceid;

    /**
     * @var string
     *
     * @Column(name="email_address", type="string", length=200, nullable=true)
     */
    private $emailAddress;

    /**
     * @var integer
     *
     * @Column(name="bouncecount", type="integer", nullable=true)
     */
    private $bouncecount;


    /**
     * Get bounceid
     *
     * @return integer 
     */
    public function getBounceid()
    {
        return $this->bounceid;
    }

    /**
     * Set emailAddress
     *
     * @param string $emailAddress
     * @return Vrbounces
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
     * Set bouncecount
     *
     * @param integer $bouncecount
     * @return Vrbounces
     */
    public function setBouncecount($bouncecount)
    {
        $this->bouncecount = $bouncecount;

        return $this;
    }

    /**
     * Get bouncecount
     *
     * @return integer 
     */
    public function getBouncecount()
    {
        return $this->bouncecount;
    }
}

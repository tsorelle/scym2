<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Messages
 *
 * @Table(name="messages")
 * @Entity
 */
class Messages
{
    /**
     * @var integer
     *
     * @Column(name="msgId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $msgid;

    /**
     * @var string
     *
     * @Column(name="sender", type="string", length=100, nullable=true)
     */
    private $sender;

    /**
     * @var string
     *
     * @Column(name="location", type="string", length=100, nullable=true)
     */
    private $location;

    /**
     * @var \DateTime
     *
     * @Column(name="received", type="datetime", nullable=false)
     */
    private $received = 'CURRENT_TIMESTAMP';

    /**
     * @var string
     *
     * @Column(name="email", type="string", length=50, nullable=true)
     */
    private $email;

    /**
     * @var string
     *
     * @Column(name="message", type="text", nullable=true)
     */
    private $message;


    /**
     * Get msgid
     *
     * @return integer 
     */
    public function getMsgid()
    {
        return $this->msgid;
    }

    /**
     * Set sender
     *
     * @param string $sender
     * @return Messages
     */
    public function setSender($sender)
    {
        $this->sender = $sender;

        return $this;
    }

    /**
     * Get sender
     *
     * @return string 
     */
    public function getSender()
    {
        return $this->sender;
    }

    /**
     * Set location
     *
     * @param string $location
     * @return Messages
     */
    public function setLocation($location)
    {
        $this->location = $location;

        return $this;
    }

    /**
     * Get location
     *
     * @return string 
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * Set received
     *
     * @param \DateTime $received
     * @return Messages
     */
    public function setReceived($received)
    {
        $this->received = $received;

        return $this;
    }

    /**
     * Get received
     *
     * @return \DateTime 
     */
    public function getReceived()
    {
        return $this->received;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return Messages
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set message
     *
     * @param string $message
     * @return Messages
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
    }

    /**
     * Get message
     *
     * @return string 
     */
    public function getMessage()
    {
        return $this->message;
    }
}

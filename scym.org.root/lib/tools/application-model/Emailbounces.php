<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Emailbounces
 *
 * @Table(name="emailbounces", indexes={@Index(name="bounce_person", columns={"personId"})})
 * @Entity
 */
class Emailbounces
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
     * @Column(name="email", type="string", length=200, nullable=false)
     */
    private $email;

    /**
     * @var \Persons
     *
     * @ManyToOne(targetEntity="Persons")
     * @JoinColumns({
     *   @JoinColumn(name="personId", referencedColumnName="personID")
     * })
     */
    private $personid;


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
     * Set email
     *
     * @param string $email
     * @return Emailbounces
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
     * Set personid
     *
     * @param \Persons $personid
     * @return Emailbounces
     */
    public function setPersonid(\Persons $personid = null)
    {
        $this->personid = $personid;

        return $this;
    }

    /**
     * Get personid
     *
     * @return \ScymPer
     */
    public function getPersonid()
    {
        return $this->personid;
    }


}

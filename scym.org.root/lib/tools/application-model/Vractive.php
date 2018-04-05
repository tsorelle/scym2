<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Vractive
 *
 * @Table(name="vractive")
 * @Entity
 */
class Vractive
{
    /**
     * @var string
     *
     * @Column(name="email_address", type="string", length=50, nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $emailAddress;


    /**
     * Get emailAddress
     *
     * @return string 
     */
    public function getEmailAddress()
    {
        return $this->emailAddress;
    }
}

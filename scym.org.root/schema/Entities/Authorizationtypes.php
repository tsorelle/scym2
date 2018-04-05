<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Authorizationtypes
 *
 * @Table(name="authorizationtypes")
 * @Entity
 */
class Authorizationtypes
{
    /**
     * @var string
     *
     * @Column(name="authCode", type="string", length=20, nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $authcode = '';

    /**
     * @var string
     *
     * @Column(name="description", type="string", length=80, nullable=false)
     */
    private $description = '';


    /**
     * Get authcode
     *
     * @return string 
     */
    public function getAuthcode()
    {
        return $this->authcode;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Authorizationtypes
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

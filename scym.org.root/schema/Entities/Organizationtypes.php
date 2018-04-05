<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Organizationtypes
 *
 * @Table(name="organizationtypes")
 * @Entity
 */
class Organizationtypes
{
    /**
     * @var integer
     *
     * @Column(name="organizationTypeId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $organizationtypeid;

    /**
     * @var string
     *
     * @Column(name="organizationTypeDescription", type="text", nullable=true)
     */
    private $organizationtypedescription;

    /**
     * @var string
     *
     * @Column(name="organizationTypeCode", type="string", length=10, nullable=true)
     */
    private $organizationtypecode;


    /**
     * Get organizationtypeid
     *
     * @return integer 
     */
    public function getOrganizationtypeid()
    {
        return $this->organizationtypeid;
    }

    /**
     * Set organizationtypedescription
     *
     * @param string $organizationtypedescription
     * @return Organizationtypes
     */
    public function setOrganizationtypedescription($organizationtypedescription)
    {
        $this->organizationtypedescription = $organizationtypedescription;

        return $this;
    }

    /**
     * Get organizationtypedescription
     *
     * @return string 
     */
    public function getOrganizationtypedescription()
    {
        return $this->organizationtypedescription;
    }

    /**
     * Set organizationtypecode
     *
     * @param string $organizationtypecode
     * @return Organizationtypes
     */
    public function setOrganizationtypecode($organizationtypecode)
    {
        $this->organizationtypecode = $organizationtypecode;

        return $this;
    }

    /**
     * Get organizationtypecode
     *
     * @return string 
     */
    public function getOrganizationtypecode()
    {
        return $this->organizationtypecode;
    }
}

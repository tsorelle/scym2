<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Distributiontypes
 *
 * @Table(name="distributiontypes")
 * @Entity
 */
class Distributiontypes
{
    /**
     * @var integer
     *
     * @Column(name="distributionTypeId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $distributiontypeid;

    /**
     * @var string
     *
     * @Column(name="description", type="string", length=20, nullable=true)
     */
    private $description;


    /**
     * Get distributiontypeid
     *
     * @return integer 
     */
    public function getDistributiontypeid()
    {
        return $this->distributiontypeid;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Distributiontypes
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

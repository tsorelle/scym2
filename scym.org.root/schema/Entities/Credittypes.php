<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Credittypes
 *
 * @Table(name="credittypes")
 * @Entity
 */
class Credittypes
{
    /**
     * @var integer
     *
     * @Column(name="creditTypeId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $credittypeid;

    /**
     * @var string
     *
     * @Column(name="creditType", type="string", length=30, nullable=true)
     */
    private $credittype;


    /**
     * Get credittypeid
     *
     * @return integer 
     */
    public function getCredittypeid()
    {
        return $this->credittypeid;
    }

    /**
     * Set credittype
     *
     * @param string $credittype
     * @return Credittypes
     */
    public function setCredittype($credittype)
    {
        $this->credittype = $credittype;

        return $this;
    }

    /**
     * Get credittype
     *
     * @return string 
     */
    public function getCredittype()
    {
        return $this->credittype;
    }
}

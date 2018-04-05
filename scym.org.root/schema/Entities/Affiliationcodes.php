<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Affiliationcodes
 *
 * @Table(name="affiliationcodes")
 * @Entity
 */
class Affiliationcodes
{
    /**
     * @var string
     *
     * @Column(name="affiliationCode", type="string", length=20, nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $affiliationcode = '';

    /**
     * @var string
     *
     * @Column(name="affiliation", type="string", length=80, nullable=false)
     */
    private $affiliation = '';


    /**
     * Get affiliationcode
     *
     * @return string 
     */
    public function getAffiliationcode()
    {
        return $this->affiliationcode;
    }

    /**
     * Set affiliation
     *
     * @param string $affiliation
     * @return Affiliationcodes
     */
    public function setAffiliation($affiliation)
    {
        $this->affiliation = $affiliation;

        return $this;
    }

    /**
     * Get affiliation
     *
     * @return string 
     */
    public function getAffiliation()
    {
        return $this->affiliation;
    }
}

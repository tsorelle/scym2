<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Documenttypes
 *
 * @Table(name="documenttypes")
 * @Entity
 */
class Documenttypes
{
    /**
     * @var integer
     *
     * @Column(name="documentTypeID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $documenttypeid;

    /**
     * @var string
     *
     * @Column(name="documentTypeName", type="string", length=50, nullable=true)
     */
    private $documenttypename;

    /**
     * @var string
     *
     * @Column(name="description", type="string", length=255, nullable=true)
     */
    private $description;


    /**
     * Get documenttypeid
     *
     * @return integer 
     */
    public function getDocumenttypeid()
    {
        return $this->documenttypeid;
    }

    /**
     * Set documenttypename
     *
     * @param string $documenttypename
     * @return Documenttypes
     */
    public function setDocumenttypename($documenttypename)
    {
        $this->documenttypename = $documenttypename;

        return $this;
    }

    /**
     * Get documenttypename
     *
     * @return string 
     */
    public function getDocumenttypename()
    {
        return $this->documenttypename;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Documenttypes
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

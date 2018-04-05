<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * DocumentsMigrate
 *
 * @Table(name="documents_migrate")
 * @Entity
 */
class DocumentsMigrate
{
    /**
     * @var integer
     *
     * @Column(name="documentID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $documentid;

    /**
     * @var integer
     *
     * @Column(name="documentTypeID", type="integer", nullable=false)
     */
    private $documenttypeid = '0';

    /**
     * @var string
     *
     * @Column(name="fileName", type="string", length=120, nullable=true)
     */
    private $filename;

    /**
     * @var string
     *
     * @Column(name="title", type="string", length=120, nullable=true)
     */
    private $title;

    /**
     * @var string
     *
     * @Column(name="fileType", type="string", length=4, nullable=true)
     */
    private $filetype;

    /**
     * @var string
     *
     * @Column(name="keywords", type="string", length=255, nullable=true)
     */
    private $keywords;

    /**
     * @var \DateTime
     *
     * @Column(name="datePublished", type="date", nullable=true)
     */
    private $datepublished;

    /**
     * @var \DateTime
     *
     * @Column(name="dateAdded", type="date", nullable=true)
     */
    private $dateadded;

    /**
     * @var string
     *
     * @Column(name="committee", type="string", length=100, nullable=true)
     */
    private $committee;

    /**
     * @var string
     *
     * @Column(name="ymyear", type="string", length=5, nullable=true)
     */
    private $ymyear;

    /**
     * @var string
     *
     * @Column(name="sessiontype", type="string", length=50, nullable=true)
     */
    private $sessiontype;

    /**
     * @var string
     *
     * @Column(name="docType", type="string", length=20, nullable=true)
     */
    private $doctype;

    /**
     * @var string
     *
     * @Column(name="docStatus", type="string", length=20, nullable=true)
     */
    private $docstatus;


    /**
     * Get documentid
     *
     * @return integer 
     */
    public function getDocumentid()
    {
        return $this->documentid;
    }

    /**
     * Set documenttypeid
     *
     * @param integer $documenttypeid
     * @return DocumentsMigrate
     */
    public function setDocumenttypeid($documenttypeid)
    {
        $this->documenttypeid = $documenttypeid;

        return $this;
    }

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
     * Set filename
     *
     * @param string $filename
     * @return DocumentsMigrate
     */
    public function setFilename($filename)
    {
        $this->filename = $filename;

        return $this;
    }

    /**
     * Get filename
     *
     * @return string 
     */
    public function getFilename()
    {
        return $this->filename;
    }

    /**
     * Set title
     *
     * @param string $title
     * @return DocumentsMigrate
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set filetype
     *
     * @param string $filetype
     * @return DocumentsMigrate
     */
    public function setFiletype($filetype)
    {
        $this->filetype = $filetype;

        return $this;
    }

    /**
     * Get filetype
     *
     * @return string 
     */
    public function getFiletype()
    {
        return $this->filetype;
    }

    /**
     * Set keywords
     *
     * @param string $keywords
     * @return DocumentsMigrate
     */
    public function setKeywords($keywords)
    {
        $this->keywords = $keywords;

        return $this;
    }

    /**
     * Get keywords
     *
     * @return string 
     */
    public function getKeywords()
    {
        return $this->keywords;
    }

    /**
     * Set datepublished
     *
     * @param \DateTime $datepublished
     * @return DocumentsMigrate
     */
    public function setDatepublished($datepublished)
    {
        $this->datepublished = $datepublished;

        return $this;
    }

    /**
     * Get datepublished
     *
     * @return \DateTime 
     */
    public function getDatepublished()
    {
        return $this->datepublished;
    }

    /**
     * Set dateadded
     *
     * @param \DateTime $dateadded
     * @return DocumentsMigrate
     */
    public function setDateadded($dateadded)
    {
        $this->dateadded = $dateadded;

        return $this;
    }

    /**
     * Get dateadded
     *
     * @return \DateTime 
     */
    public function getDateadded()
    {
        return $this->dateadded;
    }

    /**
     * Set committee
     *
     * @param string $committee
     * @return DocumentsMigrate
     */
    public function setCommittee($committee)
    {
        $this->committee = $committee;

        return $this;
    }

    /**
     * Get committee
     *
     * @return string 
     */
    public function getCommittee()
    {
        return $this->committee;
    }

    /**
     * Set ymyear
     *
     * @param string $ymyear
     * @return DocumentsMigrate
     */
    public function setYmyear($ymyear)
    {
        $this->ymyear = $ymyear;

        return $this;
    }

    /**
     * Get ymyear
     *
     * @return string 
     */
    public function getYmyear()
    {
        return $this->ymyear;
    }

    /**
     * Set sessiontype
     *
     * @param string $sessiontype
     * @return DocumentsMigrate
     */
    public function setSessiontype($sessiontype)
    {
        $this->sessiontype = $sessiontype;

        return $this;
    }

    /**
     * Get sessiontype
     *
     * @return string 
     */
    public function getSessiontype()
    {
        return $this->sessiontype;
    }

    /**
     * Set doctype
     *
     * @param string $doctype
     * @return DocumentsMigrate
     */
    public function setDoctype($doctype)
    {
        $this->doctype = $doctype;

        return $this;
    }

    /**
     * Get doctype
     *
     * @return string 
     */
    public function getDoctype()
    {
        return $this->doctype;
    }

    /**
     * Set docstatus
     *
     * @param string $docstatus
     * @return DocumentsMigrate
     */
    public function setDocstatus($docstatus)
    {
        $this->docstatus = $docstatus;

        return $this;
    }

    /**
     * Get docstatus
     *
     * @return string 
     */
    public function getDocstatus()
    {
        return $this->docstatus;
    }
}

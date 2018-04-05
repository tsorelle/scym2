<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Documents
 *
 * @Table(name="documents")
 * @Entity
 */
class Documents
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
     * @return Documents
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
     * @return Documents
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
     * @return Documents
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
     * @return Documents
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
     * @return Documents
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
     * @return Documents
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
     * @return Documents
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
}

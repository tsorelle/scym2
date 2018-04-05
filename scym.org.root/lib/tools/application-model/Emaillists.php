<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Emaillists
 *
 * @Table(name="emaillists")
 * @Entity
 */
class Emaillists
{
    /**
     * @var integer
     *
     * @Column(name="emailListId", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $emaillistid;

    /**
     * @var string
     *
     * @Column(name="listName", type="string", length=50, nullable=false)
     */
    private $listname;


    /**
     * Get emaillistid
     *
     * @return integer 
     */
    public function getEmaillistid()
    {
        return $this->emaillistid;
    }

    /**
     * Set listname
     *
     * @param string $listname
     * @return Emaillists
     */
    public function setListname($listname)
    {
        $this->listname = $listname;

        return $this;
    }

    /**
     * Get listname
     *
     * @return string 
     */
    public function getListname()
    {
        return $this->listname;
    }
}

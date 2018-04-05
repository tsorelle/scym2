<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Housingtypes
 *
 * @Table(name="housingtypes")
 * @Entity
 */
class Housingtypes
{
    /**
     * @var integer
     *
     * @Column(name="housingTypeID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="IDENTITY")
     */
    private $housingtypeid = '0';

    /**
     * @var string
     *
     * @Column(name="housingTypeCode", type="string", length=20, nullable=false)
     */
    private $housingtypecode = '';

    /**
     * @var string
     *
     * @Column(name="housingType", type="string", length=50, nullable=true)
     */
    private $housingtype;

    /**
     * @var integer
     *
     * @Column(name="category", type="integer", nullable=true)
     */
    private $category = '1';

    /**
     * @var integer
     *
     * @Column(name="active", type="integer", nullable=true)
     */
    private $active = '1';


    /**
     * Get housingtypeid
     *
     * @return integer 
     */
    public function getHousingtypeid()
    {
        return $this->housingtypeid;
    }

    /**
     * Set housingtypecode
     *
     * @param string $housingtypecode
     * @return Housingtypes
     */
    public function setHousingtypecode($housingtypecode)
    {
        $this->housingtypecode = $housingtypecode;

        return $this;
    }

    /**
     * Get housingtypecode
     *
     * @return string 
     */
    public function getHousingtypecode()
    {
        return $this->housingtypecode;
    }

    /**
     * Set housingtype
     *
     * @param string $housingtype
     * @return Housingtypes
     */
    public function setHousingtype($housingtype)
    {
        $this->housingtype = $housingtype;

        return $this;
    }

    /**
     * Get housingtype
     *
     * @return string 
     */
    public function getHousingtype()
    {
        return $this->housingtype;
    }

    /**
     * Set category
     *
     * @param integer $category
     * @return Housingtypes
     */
    public function setCategory($category)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return integer 
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set active
     *
     * @param integer $active
     * @return Housingtypes
     */
    public function setActive($active)
    {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return integer 
     */
    public function getActive()
    {
        return $this->active;
    }
}

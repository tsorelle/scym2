<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Mealsarchive
 *
 * @Table(name="mealsarchive")
 * @Entity
 */
class Mealsarchive
{
    /**
     * @var integer
     *
     * @Column(name="year", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="NONE")
     */
    private $year = '0';

    /**
     * @var integer
     *
     * @Column(name="mealID", type="integer", nullable=false)
     * @Id
     * @GeneratedValue(strategy="NONE")
     */
    private $mealid = '0';

    /**
     * @var integer
     *
     * @Column(name="attenderID", type="integer", nullable=false)
     */
    private $attenderid = '0';

    /**
     * @var boolean
     *
     * @Column(name="mealTime", type="boolean", nullable=false)
     */
    private $mealtime = '0';

    /**
     * @var boolean
     *
     * @Column(name="vegetarian", type="boolean", nullable=false)
     */
    private $vegetarian = '0';


    /**
     * Set year
     *
     * @param integer $year
     * @return Mealsarchive
     */
    public function setYear($year)
    {
        $this->year = $year;

        return $this;
    }

    /**
     * Get year
     *
     * @return integer 
     */
    public function getYear()
    {
        return $this->year;
    }

    /**
     * Set mealid
     *
     * @param integer $mealid
     * @return Mealsarchive
     */
    public function setMealid($mealid)
    {
        $this->mealid = $mealid;

        return $this;
    }

    /**
     * Get mealid
     *
     * @return integer 
     */
    public function getMealid()
    {
        return $this->mealid;
    }

    /**
     * Set attenderid
     *
     * @param integer $attenderid
     * @return Mealsarchive
     */
    public function setAttenderid($attenderid)
    {
        $this->attenderid = $attenderid;

        return $this;
    }

    /**
     * Get attenderid
     *
     * @return integer 
     */
    public function getAttenderid()
    {
        return $this->attenderid;
    }

    /**
     * Set mealtime
     *
     * @param boolean $mealtime
     * @return Mealsarchive
     */
    public function setMealtime($mealtime)
    {
        $this->mealtime = $mealtime;

        return $this;
    }

    /**
     * Get mealtime
     *
     * @return boolean 
     */
    public function getMealtime()
    {
        return $this->mealtime;
    }

    /**
     * Set vegetarian
     *
     * @param boolean $vegetarian
     * @return Mealsarchive
     */
    public function setVegetarian($vegetarian)
    {
        $this->vegetarian = $vegetarian;

        return $this;
    }

    /**
     * Get vegetarian
     *
     * @return boolean 
     */
    public function getVegetarian()
    {
        return $this->vegetarian;
    }
}

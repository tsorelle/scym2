<?php
/**
 * Created by PhpStorm.
 * User: Terry
 * Date: 7/7/2015
 * Time: 7:06 AM
 */

namespace testscript;

use Drupal\tops\Identity\TDrupalUser;

class program {
    public function run() {
        $account = \Drupal::currentUser();
        $account->getUsername();

        $drupalUser = user_load_by_name($account->getUsername());
        print_r($drupalUser->field_full_name);
        print_r($drupalUser->field_friends_meeting);

        $test = $this->createFieldArray('fidle_name','Terry SoRelle');
        print_r($test);

        /*
        if ($drupalUser != null) {
            $vars = get_object_vars($drupalUser);
        $vars = get_object_vars($account);
        var_dump($vars);
        */
    }
    function createFieldArray($fieldname,$value)
    {
        $result = Array('und' => Array());
        $result['und'][0] = Array(
            'value' => $value,
            'safe_value' => $value
        );

        return $result;

    }
}

$maxcount = $_GET['maxcount'];
print "\nMaxcount=$maxcount\n";
$program = new program();
$program->run();


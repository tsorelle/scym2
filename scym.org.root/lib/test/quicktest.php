<?php
/**
 * Created by PhpStorm.
 * User: Terry
 * Date: 3/15/2015
 * Time: 6:09 PM
 *
 * Autoload techniques:
 * To autoload tops and drupal core:
 *    require __DIR__.'/../Tops/start/autoload.php';
 *
 * To autoload tops, drupal and selected extensions such as tops module:
 *   $loader = require __DIR__.'/../Tops/start/autoload.php';
 *   Tops\test\TTestLoader::Create($loader,"tops");
 *
 * To autoload tops, drupal core and all Drupal Extensions:
 *    require_once __DIR__.'/../Tops/start/drupalAutoload.php';
 */



exit;
function dateToArray($value)
{
    $time = strtotime($value);
    $dateValue = array(
        'value' => date('Y-m-d',$time).' 00:00:00',
        'timezone' => 'America/Chicago',
        'timezone_db' => 'America/Chicago',
        'date_type' => 'datetime'
    );
    return $dateValue; // $this->toFieldSpec($dateValue);
}

$r = dateToArray(date('Y-m-d'));
print_r($r);




exit;
use Tops\db\TQueryManager;

require_once(__DIR__.'/../../lib/Tops/start/autoload.php');
require_once(__DIR__.'/../../lib/Tops/start/init.php');
$qm = new TQueryManager();
$dates = file('D:\Projects\websites\scym.org\next\data\easters.txt');
// print_r($dates);

foreach ($dates as $easter) {
    $parts = explode('-',$easter);

    $year = $parts[0];
    $start =  date('Y-m-d', strtotime( $parts[0].'-'.$parts[1].'-'.($parts[2] - 3)));
    print "$start to $easter ";

    $values = array(
        'year' => $year,
        'start' => $start,
        'end' => $easter
    );
    // return 888;
    $qm->insert('ymdates',$values);
}



print "\ndone";


exit;
include_once('D:\Projects\websites\scym.org\next\public_html\lib\Tops\src\sys\TPath.php');

//$root = realpath( __DIR__.'/../..');
// $p = realpath($root);
$vmRoot = \Tops\sys\TPath::FromRoot('/assets/js/Tops.App');
$files = scandir($vmRoot);
$result = array();
foreach($files as $fileName) {
    $isVmFile = strstr($fileName,'ViewModel.js');
    if ($isVmFile) {
        $parts = explode('ViewModel.js',$fileName);
        $vmName = $parts[0];
        $result[strtolower($vmName)] = $vmName;
    }


}

print_r($result);


exit;
$x = new stdClass();
$x->message = 'hello';
$y = clone $x;
$y->message = 'world';
print $x->message;
print "\n";
print $y->message;
exit;

$duration = 2;
print $duration."\n";

$interval = new  \DateInterval('PT'.$duration.'S');
$current = new \DateTime();
$expirationTime = new \DateTime();
$expirationTime->add($interval);

print 'Start: '. $current->format('Y-m-d H:m:s')."\n";
print 'End: '.$expirationTime->format('Y-m-d H:m:s')."\n\n\n";

while (true) {
    sleep(1);
    $now = new \DateTime();
    print 'Now :'. $now->format('Y-m-d H:m:s')."\n";
    print 'Expires: '.$expirationTime->format('Y-m-d H:m:s')."\n\n";
     if ($expirationTime < new \DateTime()) {
         break;
     }
}




exit;
function secureContent($request)
{
    if (empty($request)) {
        return true;
    }

    if (is_object($request)) {
        $content = json_encode($request);
    }
    else {
        $content = $request;
        if (is_numeric(trim($content))) {
            return true;
        }
    }

    // disallow any html tags that might contain script injection
    if (strstr($content,'<')) {
        $tags = array('script', 'object', 'img', 'a', 'button', 'p', 'span', 'div', 'form', 'section', 'input', 'ul', 'ol', 'select', 'text', 'style');
        foreach ($tags as $tag) {
            $pattern = '/(' . $tag . '|<*\s' . $tag . ')(>|\s)/i';
            if (preg_match($pattern, $content)) {
                return false;
            }
        }
    }
    return true;
}






class TestClass {
    public $first;
    public $last;
    public $middle;
}

$x = new TestClass;

$x->first = 'Terry';
$x->middle =  'Layton';
// $x->middle =  'Layton <script>altert("hac k ed"), </script>';
$x->last = 'SoRelle';

// $x->middle = ' < script  >altert("hac k ed"); <              /script  >';
//$x = 'hello world';
// $x = '  hello world <   span onclick="gotcha" /> end  ';
// $x = '  123  ';
// $x = '123';
//$x = 210;
$x = 232.920;

$r = secureContent($x);
print $r ? 'safe' : 'UNSAFE';
print "\n";
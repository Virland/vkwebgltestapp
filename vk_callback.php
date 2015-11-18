<?php 
header("Content-Type: application/json; encoding=utf-8"); 

$secret_key = 'WBMkoAO4k7IHGPR3UdyX'; // Защищенный ключ приложения 

$input = $_POST; 

// Проверка подписи 
$sig = $input['sig']; 
unset($input['sig']); 
ksort($input); 
$str = ''; 
foreach ($input as $k => $v) { 
  $str .= $k.'='.$v; 
} 

if ($sig != md5($str.$secret_key)) { 
  $response['error'] = array( 
    'error_code' => 10, 
    'error_msg' => 'Несовпадение вычисленной и переданной подписи запроса.', 
    'critical' => true 
  ); 
} else { 
  // Подпись правильная 
  switch ($input['notification_type']) { 
    case 'get_item': 
      // Получение информации о товаре 
      $item = $input['item']; // наименование товара 

if ($item == 'Gold_100') { 
        $response['response'] = array( 
          'item_id' => 25, 
          'title' => '100 золотых монет', 
          'photo_url' => 'http://g01.a.alicdn.com/kf/HTB1r14CIFXXXXc3XpXXq6xXFXXXV/Wholesale-Pillow-Cushion-Cute-Emoji-Funny-Poo-Shit-Shape-Pillow-Stuff-Doll-Novelty-Free-Shipping-2015.jpg_50x50.jpg', 
          'price' => 1
        ); 
      } else { 
        $response['error'] = array( 
          'error_code' => 20, 
          'error_msg' => 'Товара не существует.', 
          'critical' => true 
        ); 
      } 
      break; 

case 'get_item_test': 
      // Получение информации о товаре в тестовом режиме 
      $item = $input['item']; 
      if ($item == 'Gold_100') { 
        $response['response'] = array( 
          'item_id' => 125, 
          'title' => '100 золотых монет (тестовый режим)', 
          'photo_url' => 'http://g01.a.alicdn.com/kf/HTB1r14CIFXXXXc3XpXXq6xXFXXXV/Wholesale-Pillow-Cushion-Cute-Emoji-Funny-Poo-Shit-Shape-Pillow-Stuff-Doll-Novelty-Free-Shipping-2015.jpg_50x50.jpg', 
          'price' => 1 
        ); 
      } else { 
        $response['error'] = array( 
          'error_code' => 20, 
          'error_msg' => 'Товара не существует.', 
          'critical' => true 
        ); 
      } 
      break; 

case 'order_status_change': 
      // Изменение статуса заказа 
      if ($input['status'] == 'chargeable') { 
        $order_id = intval($input['order_id']); 

// Код проверки товара, включая его стоимость 
        $app_order_id = 1; // Получающийся у вас идентификатор заказа. 

$response['response'] = array( 
          'order_id' => $order_id, 
          'app_order_id' => $app_order_id, 
        ); 
      } else { 
        $response['error'] = array( 
          'error_code' => 100, 
          'error_msg' => 'Передано непонятно что вместо chargeable.', 
          'critical' => true 
        ); 
      } 
      break; 

case 'order_status_change_test': 
      // Изменение статуса заказа в тестовом режиме 
      if ($input['status'] == 'chargeable') { 
        $order_id = intval($input['order_id']); 

$app_order_id = 1; // Тут фактического заказа может не быть - тестовый режим. 

$response['response'] = array( 
          'order_id' => $order_id, 
          'app_order_id' => $app_order_id, 
        ); 
      } else { 
        $response['error'] = array( 
          'error_code' => 100, 
          'error_msg' => 'Передано непонятно что вместо chargeable.', 
          'critical' => true 
        ); 
      } 
      break; 
  } 
} 

echo json_encode($response); 
?>
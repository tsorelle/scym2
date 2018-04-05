SELECT a.`attenderID` AS id, a.`registrationId` AS rid, a.firstname, a.lastname, 
 (CASE h.`day` WHEN 4 THEN 'Thur' WHEN 5 THEN 'Fri' WHEN 6 THEN 'Sat' ELSE '' END) AS `day`,  
  IF(a.generationId - 1,'Youth','Adult') AS generation, 
  IF (ht.category=1,'Dorm','Cabin/Motel') AS CampCategory, ht2.`housingTypeDescription` AS requested, ht.`housingTypeDescription` AS assigned
FROM housingassignments h
JOIN currentAttenders a ON h.attenderId = a.attenderId
JOIN housingunits hu ON h.housingUnitId = hu.housingUnitId
JOIN housingtypes ht ON hu.housingTypeId = ht.housingTypeId
JOIN housingtypes ht2 ON a.housingTypeId = ht2.housingTypeId
WHERE generationId < 3 AND attended = 1
ORDER BY a.`lastName`,a.`firstName`,h.`day`





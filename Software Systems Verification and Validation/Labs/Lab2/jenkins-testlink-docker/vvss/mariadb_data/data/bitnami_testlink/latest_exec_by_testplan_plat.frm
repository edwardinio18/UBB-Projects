TYPE=VIEW
query=select `bitnami_testlink`.`executions`.`tcversion_id` AS `tcversion_id`,`bitnami_testlink`.`executions`.`testplan_id` AS `testplan_id`,`bitnami_testlink`.`executions`.`platform_id` AS `platform_id`,max(`bitnami_testlink`.`executions`.`id`) AS `id` from `bitnami_testlink`.`executions` group by `bitnami_testlink`.`executions`.`tcversion_id`,`bitnami_testlink`.`executions`.`testplan_id`,`bitnami_testlink`.`executions`.`platform_id`
md5=dc4f845ce7f2131f9d754d7b0227c6a1
updatable=0
algorithm=0
definer_user=bn_testlink
definer_host=%
suid=2
with_check_option=0
timestamp=0001677861257564474
create-version=2
source=SELECT tcversion_id, testplan_id,platform_id,max(id) AS id\nFROM  executions \nGROUP BY tcversion_id,testplan_id,platform_id
client_cs_name=latin1
connection_cl_name=latin1_swedish_ci
view_body_utf8=select `bitnami_testlink`.`executions`.`tcversion_id` AS `tcversion_id`,`bitnami_testlink`.`executions`.`testplan_id` AS `testplan_id`,`bitnami_testlink`.`executions`.`platform_id` AS `platform_id`,max(`bitnami_testlink`.`executions`.`id`) AS `id` from `bitnami_testlink`.`executions` group by `bitnami_testlink`.`executions`.`tcversion_id`,`bitnami_testlink`.`executions`.`testplan_id`,`bitnami_testlink`.`executions`.`platform_id`
mariadb-version=100338

#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
__title__ = ''
__author__ = 'zhonghaolin'
__mtime__ = '2020/11/24'
__function__ = ''
"""


from django.urls import path
from .views import index, submit_job, status
urlpatterns = [
    path('index/', index.index, name="index"),    # 主页
    path('submit_job/', submit_job.submit_job, name="submit_job"),    # 任务提交
    path('status/<pid>', status.status, name="status"),    # 状态展示
    # path('update_status/<pid>', status.update_status, name="update_status"),    # 更新状态
    # path('classification/organism/<organism>', views.organism_show, name="organism_show"),
    # path('<str:protein_name>', views.show, name="show"),    # 内容页
    # path('<str:protein_name>/annotations', views.annotation, name="show"),    # 注释页
]
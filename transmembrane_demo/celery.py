#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
__title__ = ''
__author__ = 'zhonghaolin'
__mtime__ = '2020/11/24'
__function__ = ''
"""

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from django.conf import settings

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'transmembrane_demo.settings')

app = Celery('transmembrane_demo')

# 配置celery
class Config:
	# BROKER_URL = 'redis://47.114.43.67:6379'
	# CELERY_RESULT_BACKEND = 'redis://47.114.43.67:6379'
	# 本地连接：https://blog.csdn.net/bug_moving/article/details/54907725
	BROKER_URL = 'redis://127.0.0.1:6379'
	CELERY_RESULT_BACKEND = 'redis://127.0.0.1:6379'
	"""这个是任务预取功能，就是每个工作的进程／线程／绿程在获取任务的时候，会尽量多拿 n 个，
	以保证获取的通讯成本可以压缩，在每个任务很短（明显小于 1 秒）情况下，是值得调大的，而且推荐是 2 的幂。
	0 表示尽可能多拿。如果 1 个都不想多拿，那么除了设置 1 外，还需要 设置 task_acks_late 为 true，
	如果你的任务不是幂等（可以重复调用）的话，可能会有问题。
	详细解释参考： http://docs.celeryproject.org/en/latest/userguide/optimizing.html"""
	CELERY_TASK_RESULT_EXPIRES = 60 * 60 * 24  # 任务过期时间
	CELERY_ACKS_LATE = True
	CELERYD_PREFETCH_MULTIPLIER = 1
	# CELERYD_PREFETCH_MULTIPLIER = 4    # celery worker每次去redis取任务的数量，默认值就是4
	# CELERYD_MAX_TASKS_PER_CHILD = 40    # 每个worker执行了多少任务就会死掉，默认是无限的

app.config_from_object(Config)

# Load task modules from all registered Django app configs.
app.autodiscover_tasks(settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
	print('Request: {0!r}'.format(self.request))
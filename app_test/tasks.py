#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
__title__ = ''
__author__ = 'zhonghaolin'
__mtime__ = '2020/11/24'
__function__ = ''
"""

# Create your tasks here
from __future__ import absolute_import, unicode_literals
from celery import shared_task


@shared_task
def add(x, y):
	return x + y


@shared_task
def submit(sequence):
	# submit job
	import time
	time.sleep(15)
	print("running")
	import random
	# res = {"seq": sequence, "p": random.randrange(0, 1), "site": sequence[random.randrange(0, len(sequence))]}
	res = {'topo': {"4cz9_B": [[6, 26], [31, 46], [54, 74], [88, 111], [116, 127], [131, 135], [150, 174], [192, 221],
							[228, 249], [253, 266], [292, 311], [321, 343], [363, 370], [388, 411]]},
			'orientation': {"4cz9_B": True},
			'topo_proba': {"4cz9_B": []},
			'sequence': sequence
		   }
	return res

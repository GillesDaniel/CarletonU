<div class="recordHover skd-tooltip">
	<div class="sectionb">
		<#list constraints as constraint>
		<div class="sectionlabel" style="min-width:300px;">${constraint['constraintTypeDescription']}</div>
		<div class="sectioncol">
			<div class="section">
				<div class="control ">
					<label class="text ">${label('leadlagtime')}</label><br /> <input
						type="text" class="text fld " value="${constraint['LEADLAGHOURS']}" readonly="readonly" />
				</div>

				<div class="section ">
					<div class="sectionlabel "></div>

					<#if constraint['WONUM']?has_content>
					<div class="control ">
						<label class="text ">${label('wonum')}</label><br /> <input
							type="text" class="text fld " value="${constraint['WONUM']}" readonly="readonly" />
					</div>
					</#if>

					<#if constraint['TASKID']?has_content>
					<div class="control ">
						<label class="text ">${label('parentWonum')}</label><br /> <input
							type="text" class="text fld " value="${constraint['PARENT_WONUM']}" readonly="readonly" />
					</div>
					<div class="control ">
						<label class="text ">${label('parentDescTitle')}</label><br /> <input
							type="text" class="text fld " value="${constraint['PARENT_name']}" readonly="readonly" size="100"/>
					</div>
					<div class="control ">
						<label class="text ">${label('task')}</label><br /> <input
							type="text" class="text fld " value="${constraint['TASKID']}" readonly="readonly" />
					</div>
					</#if>

					<div class="control ">
						<label class="text ">${label('descTitle')}</label><br /> <input
							type="text" class="text fld " value="${constraint['name']}" readonly="readonly" size="100"/>
					</div>

					<div class="control ">
						<label class="text ">${label('startDate')}</label><br /> <input
							type="text" class="text fld " value="${constraint['startTime']}" readonly="readonly" />
					</div>
			
					<div class="control ">
						<label class="text ">${label('endDate')}</label><br /> <input
							type="text" class="text fld " value="${constraint['endTime']}" readonly="readonly" />
					</div>
							
					<div class="control ">
						<label class="text ">${label('duration')}</label><br /> <input
							type="text" class="text fld " value="${constraint['duration']}" readonly="readonly" />
					</div>
				</div>
			</div>
		</div>
		</#list>
	</div>
</div>
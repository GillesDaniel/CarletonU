<div class="recordHover skd-tooltip">
	<div class="sectionb ">
		<div class="sectionlabel">${label('shift_info_header')}</div>
		<#list shifts as shift>
            <div class="sectioncol ">
                <div class="section ">
                    <div class="control ">
                        <label class="text ">${label('description')}</label><br /> <input
                            type="text" class="text fld " value="${shift.shiftWorkTime.shiftDescription!}" readonly="readonly" />
                    </div>

                    <div class="control ">
                        <label class="text ">${label('shift')}</label><br /> <input
                            type="text" class="text fld " value="${shift.shiftWorkTime.shiftNum!}" readonly="readonly" />
                    </div>

                    <div class="control ">
                        <label class="text ">${label('start')}</label><br /> <input
                            type="text" class="text fld " value="${serverTime(shift.start)}"
                            readonly="readonly" />
                    </div>

                    <div class="control ">
                        <label class="text ">${label('finish')}</label><br /> <input
                            type="text" class="text fld " value="${serverTime(shift.end)}"
                            readonly="readonly" />
                    </div>

                    <div class="control ">
                        <label class="text ">${label('duration')}</label><br /> <input
                            type="text" class="text fld " value="${duration(shift.start, shift.end)!}"
                            readonly="readonly" />
                    </div>

                    <div style="background-color: ${shift.color}; height: 20px; width:100%;"></div>
                </div>
            </div>
		</#list>
	</div>
</div>
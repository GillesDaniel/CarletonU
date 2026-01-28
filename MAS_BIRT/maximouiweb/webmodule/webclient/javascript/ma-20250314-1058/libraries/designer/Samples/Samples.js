/*
 * Licensed Materials - Property of IBM
 *
 * 5724-U18, 5737-M66
 *
 * (C) Copyright IBM Corp. 2023,2024 All Rights Reserved
 *
 * US Government Users Restricted Rights - Use, duplication or
 * disclosure restricted by GSA ADP Schedule Contract with
 * IBM Corp.
 */

DesignerLoaded({
   Styles:[
      { Name:"SampleStyle", Src:"Samples.css"},
      ],

   // Global definitions for <svg>, added only once per page by the unique <D> Name, on its first occurrence
   DefSvg: [
      { Name:"SampleGradients", Html:''
         +'<radialGradient id="SampleGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">'
            +'<stop offset="0%" style="stop-color:#FFF;" />'
            +'<stop offset="100%" style="stop-color:#6E6;" />'
         +'</radialGradient>'
         }
      ],

   DefBoxes: [

      // Calculates width of the Special box
      { Name:"Size5", MinWidth:"100", MinHeight:"80", PaddingLeft:"10", PaddingRight:"10", PaddingTop:"10", PaddingBottom:"10", AutoSize:"1", Html:''
         +'<size width="" padding="{PaddingLeft+PaddingRight}">'
            +'<span class="Text">{Text?Text:id}</span>'
         +'</size>'
         },

      // The main edit and 4 small edits in the Special box
      { Name:"Edit5", EditAttr:"Text", EditClass:"Edit", Save:"R,Text,Text11,Text12,Text21,Text22",
         Text11:"1", Text12:"3", Text21:"6",
         TextTLEditAttr:"Text11", TextTLEditClass:"EditTL", TextBLEditAttr:"Text21", TextBLEditClass:"EditBL",
         TextTREditAttr:"Text12", TextTREditClass:"EditTR", OnDblClickTextBR:"D.ShowMessageTime(I.Text11+'+'+I.Text12+'+'+I.Text21+' = '+I.Text22),1",
         IconValue:"0", OnLeftClickIcon:"if(!I.Disabled) { I.IconValue = !I.IconValue; D.RefreshItem(I); } return 1;", Html:''
         +'<![CDATA['
            +'I.Text22 = (Text11-0?Text11-0:Text11) + (Text12-0?Text12-0:Text12) + (Text21-0?Text21-0:Text21)'
         +']]>'
         +'<div class="None" style="width:{Width-PaddingRight}px;overflow-x:hidden;height:{Height}px;">'
            +'<div class="Abs" part="TextTL" style="left:{PaddingLeft}px;top:{PaddingTop}px;">'
               +'<div class="TextFixed EditTL" style="width:{Width/2-PaddingLeft-15}px;">{Text11?Text11:""}</div>'
            +'</div>'
            +'<div class="Abs" part="TextBL" style="left:{PaddingLeft}px;top:{Height-PaddingBottom-18}px;">'
               +'<div class="TextFixed EditBL" style="width:{Width/2-PaddingLeft-15}px;">{Text21?Text21:""}</div>'
            +'</div>'
            +'<div class="Abs" part="TextTR" style="left:{Width/2+3}px;top:{PaddingTop}px;">'
               +'<div class="TextFixed EditTR" style="width:{Width/2-PaddingRight-15}px;text-align:right;">{Text12?Text12:""}</div>'
            +'</div>'
            +'<div class="Abs" part="TextBR" style="left:{Width/2+3}px;top:{Height-PaddingBottom-18}px">'
               +'<div class="TextFixed EditBR" style="width:{Width/2-PaddingRight-15}px;text-align:right;background:#FCF;">{Text22?Text22:""}</div>'
            +'</div>'
            +'<div class="Abs Text" part="Text" style="left:{Width/2-(AutoWidth>Width?Width/2:AutoWidth/2)+PaddingLeft}px;top:{Height/2-9}px;white-space:nowrap;">{Text?Text:id}</div>'
            +'<div class="Abs Edit" part="None" style="left:{PaddingLeft-1}px;top:{Height/2-11}px;width:{Width-PaddingLeft-PaddingRight+1}px;">&#160;</div>'
         +'</div>'
         },

      // The 5 areas to connect lines in the Special box
      { Name:"Lines1", LineInEdge:"", LineOutEdge:"",
         OnDragOut:"CreateLine", OutRLineEdge:"Right", OutR1LineOut:"CurveRed", OutR2LineOut:"CurveBlue", OutR3LineOut:"CurveGreen",
         InLineIn:"All", InTLLineEdge:"TopLeft", InBLLineEdge:"BottomLeft", InTLLineDX:"-9", InTLLineDY:"-9", InBLLineDX:"-8", InBLLineDY:"8", Html:''
         +'<![CDATA['
            +'I.OutR1LineDY = -Height/4; I.OutR3LineDY = Height/4;'
         +']]>'
         +'<svg>'
            +'<rect class="SVGIcon2" part="Out,OutR,OutR1" x="{Width-6}" y="{Height/4-6}" width="20" height="12" rx="5" ry="5"/>'
            +'<rect class="SVGIcon2" part="Out,OutR,OutR2" x="{Width}" y="{Height/2-6}" width="20" height="12" rx="5" ry="5"/>'
            +'<rect class="SVGIcon2" part="Out,OutR,OutR3" x="{Width-6}" y="{Height/4*3-6}" width="20" height="12" rx="5" ry="5"/>'
            +'<rect class="SVGIcon2" part="In,InTL" x="-10" y="-10" width="20" height="12" rx="5" ry="5" transform="rotate(45,-3,-3)" style="fill:#AFFFAF;"/>'
            +'<rect class="SVGIcon2" part="In,InBL" x="-10" y="{Height-6}" width="20" height="12" rx="5" ry="5" transform="rotate(135,0,{Height})" style="fill:#BFB;"/>'
         +'</svg>'
         },

      // Image box
      { Name:"SampleAlarm", Def:"Box", ResizeEdge:"All", HoverClass:"SamplesAlarm,SamplesAlarmHover", SizeRatio:"1", Html:''
         +'<div class="SamplesAlarm" part="Box,Resize" style="width:{Width}px;height:{Height}px"></div>'
      },

      // Special box definition
      { Name:"SampleCloud", Def:"Size5,ShapeCloud,Lines1,Edit5", Border:"transparent", Background:"url(#SampleGradient)", R:"0.5,30,1,30,0.5,30,1,-10" } // Uses ShapeCloud from Shapes.xml
      ]
   });

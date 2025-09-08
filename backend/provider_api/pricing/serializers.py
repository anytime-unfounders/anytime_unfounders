from rest_framework import serializers

class QuoteRequestSerializer(serializers.Serializer):
    query = serializers.CharField()
    currency = serializers.ChoiceField(choices=["CAD","USD"], required=False)

class QuoteResponseSerializer(serializers.Serializer):
    currency = serializers.CharField(); median = serializers.FloatField()
    low = serializers.FloatField(); high = serializers.FloatField()
    model_version = serializers.CharField(); quote_id = serializers.UUIDField()
    
class QuoteForProvidersRequestSerializer(serializers.Serializer):
    query = serializers.CharField()
    provider_ids = serializers.ListField(child=serializers.CharField(), allow_empty=False)
    currency = serializers.ChoiceField(choices=["CAD","USD"], required=False)